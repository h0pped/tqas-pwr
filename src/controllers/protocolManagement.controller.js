const sequelize = require('../sequelize')

const User = sequelize.models.user
const Protocol = sequelize.models.protocol
const Evaluation = sequelize.models.evaluation
const FilledProtocol = sequelize.models.filled_protocol

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
        const draftProtocol = await evaluation.getFilled_protocol({where: {status: 'Draft'}})
        if(draftProtocol){
            return res.status(StatusCodes[PROTOCOL_FOUND]).send({ ...JSON.parse(draftProtocol.getDataValue('protocol_json')) })
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
        protocolJson['Informacje wstępne'][
            protocolJson['Informacje wstępne'].findIndex(
                (question) =>
                    question.question_text ===
                    'Prowadzący zajęcia/Jednostka organizacyjna '
            )
        ].answer =
            user.getDataValue('academic_title') +
            ' ' +
            user.getDataValue('first_name') +
            ' ' +
            user.getDataValue('last_name') +
            ', ' +
            user.getDataValue('department')

        protocolJson['Informacje wstępne'][
            protocolJson['Informacje wstępne'].findIndex(
                (question) =>
                    question.question_text === 'Nazwa kursu/kierunek studiów:'
            )
        ].answer = course.getDataValue('course_name')

        protocolJson['Informacje wstępne'][
            protocolJson['Informacje wstępne'].findIndex(
                (question) => question.question_text === 'Kod kursu'
            )
        ].answer = course.getDataValue('course_code')

        protocolJson['Informacje wstępne'][
            protocolJson['Informacje wstępne'].findIndex(
                (question) =>
                    question.question_text === 'Miejsce i termin zajęć'
            )
        ].answer = evaluation.getDataValue('details')

        return res.status(StatusCodes[PROTOCOL_FOUND]).send({ ...protocolJson })
    } catch (err) {
        return res
            .status(StatusCodes[GET_PROTOCOL_BAD_REQUEST])
            .send({ GET_PROTOCOL_BAD_REQUEST })
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
        await FilledProtocol.upsert(            {
            protocol_json: req.body.protocol_draft,
            status: 'Draft',
            evaluationId: req.body.evaluation_id
        },
        {
            conflictFields: ['evaluationId']
        })
        /*await FilledProtocol.destroy({where: {evaluationId: req.body.evaluation_id}})
        const filledProtocol = await FilledProtocol.create({ protocol_json: req.body.protocol_draft, status: 'Draft' })
        evaluation.setFilled_protocol(filledProtocol)*/
        return res
            .status(StatusCodes[DRAFT_PROTOCOL_SAVED])
            .send({ DRAFT_PROTOCOL_SAVED })
    } catch (err) {
        return res
            .status(StatusCodes[DRAFT_PROTOCOL_BAD_REQUEST])
            .send({ DRAFT_PROTOCOL_BAD_REQUEST })
    }
}
