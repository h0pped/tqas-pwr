const sequelize = require('../sequelize')

const User = sequelize.models.user
const Protocol = sequelize.models.protocol
const Evaluation = sequelize.models.evaluation
const FilledProtocol = sequelize.models.filled_protocol
const Evaluatee = sequelize.models.evaluatee

const { sendMail } = require('../mailer')
const generateEvaluationResultsAvailableEmail = require('../utils/generateEvaluationResultsAvailable')

const generateWordDocument = require('../utils/protocolPdfGeneration')

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        USER_NOT_AUTHORIZED_FOR_OPERATION,
        PROTOCOL_NAME_NOT_PROVIDED,
        PROTOCOL_CREATED_SUCCESSFULLY,
        PROTOCOL_CREATION_BAD_REQUEST,
        PROTOCOL_NOT_FOUND,
        PROTOCOL_FOUND,
        GET_PROTOCOL_BAD_REQUEST,
        EVALUATION_DOES_NOT_EXIST,
        PROTOCOL_PDF_BAD_REQUEST,
        NO_FILLED_PROTOCOL,
        PROTOCOL_FILLED_SUCCESSFULLY,
        FILL_PROTOCOL_BAD_REQUEST,
        DRAFT_PROTOCOL_SAVED,
        DRAFT_PROTOCOL_BAD_REQUEST,
    },
} = require('../config/index.config')

module.exports.createProtocol = async (req, res) => {
    try {
        const userData = JSON.parse(
            atob(req.headers.authorization.slice(7).split('.')[1])
        )
        const authorizedUser = await User.findOne({
            where: { id: userData.id, user_type: 'admin' },
        })
        if (!authorizedUser) {
            return res
                .status(StatusCodes[USER_NOT_AUTHORIZED_FOR_OPERATION])
                .send({ USER_NOT_AUTHORIZED_FOR_OPERATION })
        }
        const protocolName = Object.keys(req.body)[0]
        if (!protocolName) {
            return res
                .status(StatusCodes[PROTOCOL_NAME_NOT_PROVIDED])
                .send({ PROTOCOL_NAME_NOT_PROVIDED })
        }
        await Protocol.create({
            protocol_name: protocolName,
            protocol_json: JSON.stringify(req.body[protocolName]),
        })
        return res
            .status(StatusCodes[PROTOCOL_CREATED_SUCCESSFULLY])
            .send({ PROTOCOL_CREATED_SUCCESSFULLY })
    } catch (err) {
        return res
            .status(StatusCodes[PROTOCOL_CREATION_BAD_REQUEST])
            .send({ PROTOCOL_CREATION_BAD_REQUEST })
    }
}

module.exports.getProtocol = async (req, res) => {
    try {
        const userData = JSON.parse(
            atob(req.headers.authorization.slice(7).split('.')[1])
        )
        const authorizedAdmin = await User.findOne({
            where: { id: userData.id, user_type: 'admin' },
        })
        const authorizedTeamMember = await User.findOne({
            where: {
                id: userData.id,
            },
            include: {
                model: Evaluation,
                as: 'evaluations_performed_by_user',
                required: true,
                where: { id: req.query.evaluationId },
            },
        })
        if (!authorizedAdmin && !authorizedTeamMember) {
            return res
                .status(StatusCodes[USER_NOT_AUTHORIZED_FOR_OPERATION])
                .send({ USER_NOT_AUTHORIZED_FOR_OPERATION })
        }
        const evaluation = await Evaluation.findByPk(req.query.evaluationId, {
            include: [{ model: Protocol, required: true }],
        })
        if (!evaluation) {
            return res
                .status(StatusCodes[EVALUATION_DOES_NOT_EXIST])
                .send({ EVALUATION_DOES_NOT_EXIST })
        }
        const draftProtocol = await evaluation.getFilled_protocol({
            where: { status: 'Draft' },
        })
        if (draftProtocol) {
            return res
                .status(StatusCodes[PROTOCOL_FOUND])
                .send({
                    ...JSON.parse(draftProtocol.getDataValue('protocol_json')),
                })
        }
        const protocol = await evaluation.getProtocol()
        if (!protocol) {
            return res
                .status(StatusCodes[PROTOCOL_NOT_FOUND])
                .send({ PROTOCOL_NOT_FOUND })
        }
        const protocolJson = JSON.parse(protocol.getDataValue('protocol_json'))
        const evaluatee = await evaluation.getEvaluatee()
        const user = await evaluatee.getUser()
        const course = await evaluation.getCourse()
        protocolJson['Informacje wst??pne'][
            protocolJson['Informacje wst??pne'].findIndex(
                (question) =>
                    question.question_text ===
                    'Prowadz??cy zaj??cia/Jednostka organizacyjna '
            )
        ].answer =
            user.getDataValue('academic_title') +
            ' ' +
            user.getDataValue('first_name') +
            ' ' +
            user.getDataValue('last_name') +
            ', ' +
            user.getDataValue('department')

        protocolJson['Informacje wst??pne'][
            protocolJson['Informacje wst??pne'].findIndex(
                (question) =>
                    question.question_text === 'Nazwa kursu/kierunek studi??w:'
            )
        ].answer = course.getDataValue('course_name')

        protocolJson['Informacje wst??pne'][
            protocolJson['Informacje wst??pne'].findIndex(
                (question) => question.question_text === 'Kod kursu'
            )
        ].answer = course.getDataValue('course_code')

        protocolJson['Informacje wst??pne'][
            protocolJson['Informacje wst??pne'].findIndex(
                (question) =>
                    question.question_text === 'Miejsce i termin zaj????'
            )
        ].answer = evaluation.getDataValue('details')

        return res.status(StatusCodes[PROTOCOL_FOUND]).send({ ...protocolJson })
    } catch (err) {
        return res
            .status(StatusCodes[GET_PROTOCOL_BAD_REQUEST])
            .send({ GET_PROTOCOL_BAD_REQUEST })
    }
}

module.exports.getProtocolPDF = async (req, res) => {
    try {
        const evaluation = await Evaluation.findByPk(req.query.evaluation_id)
        if (!evaluation) {
            return res.status(StatusCodes[EVALUATION_DOES_NOT_EXIST]).send({
                message: EVALUATION_DOES_NOT_EXIST,
            })
        }
        const evaluationTeamMembers =
            await evaluation.getEvaluation_team_of_evaluation()
        const evaluationTeamMemberNames = evaluationTeamMembers.map(
            (member) =>
                member.getDataValue('academic_title') +
                ' ' +
                member.getDataValue('first_name') +
                ' ' +
                member.getDataValue('last_name') +
                (member.getDataValue('department') ? ', ' + member.getDataValue('department') : '')
        )
        const evaluatee = await evaluation.getEvaluatee()
        const evaluateeUserDate = await evaluatee.getUser()
        const evaluateeName =
            evaluateeUserDate.getDataValue('academic_title') +
            ' ' +
            evaluateeUserDate.getDataValue('first_name') +
            ' ' +
            evaluateeUserDate.getDataValue('last_name') +
            (evaluateeUserDate.getDataValue('department') ? ', ' + evaluateeUserDate.getDataValue('department') : '')
        
        const filledProtocol = await evaluation.getFilled_protocol()
        if (!filledProtocol) {
            return res.status(StatusCodes[NO_FILLED_PROTOCOL]).send({
                message: NO_FILLED_PROTOCOL,
            })
        }
        const generatedPdfBuffer = await generateWordDocument(
            filledProtocol.getDataValue('protocol_json'),
            evaluationTeamMemberNames,
            evaluateeName,
            evaluation.getDataValue('protocol_completion_date') ? evaluation.getDataValue('protocol_completion_date') : null,
            evaluation.getDataValue('review_date') ? evaluation.getDataValue('review_date') : null,
            evaluation.getDataValue('status')
        )
        res.contentType('application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'hospitacja.pdf')
        return res.send(generatedPdfBuffer)
    } catch (err) {
        return res.status(StatusCodes[PROTOCOL_PDF_BAD_REQUEST]).send({
            message: PROTOCOL_PDF_BAD_REQUEST,
        })
    }
}

module.exports.saveDraftProtocol = async (req, res) => {
    try {
        const userData = JSON.parse(
            atob(req.headers.authorization.slice(7).split('.')[1])
        )
        const authorizedTeamMember = await User.findOne({
            where: {
                id: userData.id,
            },
            include: {
                model: Evaluation,
                as: 'evaluations_performed_by_user',
                required: true,
                where: { id: req.body.evaluation_id },
            },
        })
        if (!authorizedTeamMember) {
            return res
                .status(StatusCodes[USER_NOT_AUTHORIZED_FOR_OPERATION])
                .send({ USER_NOT_AUTHORIZED_FOR_OPERATION })
        }
        const evaluation = await Evaluation.findByPk(req.body.evaluation_id)
        if (!evaluation) {
            return res
                .status(StatusCodes[EVALUATION_DOES_NOT_EXIST])
                .send({ EVALUATION_DOES_NOT_EXIST })
        }
        await FilledProtocol.upsert(
            {
                protocol_json: req.body.protocol_draft,
                status: 'Draft',
                evaluationId: req.body.evaluation_id,
            },
            {
                conflictFields: ['evaluationId'],
            }
        )
        return res
            .status(StatusCodes[DRAFT_PROTOCOL_SAVED])
            .send({ DRAFT_PROTOCOL_SAVED })
    } catch (err) {
        return res
            .status(StatusCodes[DRAFT_PROTOCOL_BAD_REQUEST])
            .send({ DRAFT_PROTOCOL_BAD_REQUEST })
    }
}

module.exports.fillProtocol = async (req, res) => {
    try {
        const userData = JSON.parse(
            atob(req.headers.authorization.slice(7).split('.')[1])
        )
        const authorizedTeamMember = await User.findOne({
            where: {
                id: userData.id,
            },
            include: {
                model: Evaluation,
                as: 'evaluations_performed_by_user',
                required: true,
                where: { id: req.body.evaluation_id },
            },
        })
        if (!authorizedTeamMember) {
            return res
                .status(StatusCodes[USER_NOT_AUTHORIZED_FOR_OPERATION])
                .send({ USER_NOT_AUTHORIZED_FOR_OPERATION })
        }
        const evaluation = await Evaluation.findByPk(req.body.evaluation_id)
        if (!evaluation) {
            return res
                .status(StatusCodes[EVALUATION_DOES_NOT_EXIST])
                .send({ EVALUATION_DOES_NOT_EXIST })
        }
        await FilledProtocol.upsert(
            {
                protocol_json: req.body.protocol_json,
                status: 'Filled',
                evaluationId: req.body.evaluation_id,
            },
            {
                conflictFields: ['evaluationId'],
            }
        )

        const assessmentId = evaluation.assessmentId
        const evaluateeId = evaluation.evaluateeId

        const allEvaluationsOfEvaluateeInAssessment = await Evaluation.findAll({
            where: { assessmentId: assessmentId, evaluateeId: evaluateeId },
        })

        allEvaluationsOfEvaluateeInAssessment.forEach((evaluation) => {
            evaluation.set({ status: 'Inactive', protocol_completion_date: new Date().toISOString() })
            evaluation.save()
        })

        evaluation.set({ status: 'In review' })
        evaluation.save()

        const evaluatee = await Evaluatee.findOne({
            where: { id: evaluateeId },
        })

        const userToSendEmailTo = await User.findOne({
            where: { id: evaluatee.userId },
        })

        sendMail(
            userToSendEmailTo.email,
            `TQAS - Results of your evaluation are in!`,
            generateEvaluationResultsAvailableEmail(
                `${userToSendEmailTo.academic_title} ${userToSendEmailTo.first_name} ${userToSendEmailTo.last_name}`
            )
        )
        return res
            .status(StatusCodes[PROTOCOL_FILLED_SUCCESSFULLY])
            .send({ PROTOCOL_FILLED_SUCCESSFULLY })
    } catch (err) {
        return res
            .status(StatusCodes[FILL_PROTOCOL_BAD_REQUEST])
            .send({ FILL_PROTOCOL_BAD_REQUEST })
    }
}
