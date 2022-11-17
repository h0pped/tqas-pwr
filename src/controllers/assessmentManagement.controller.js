const sequelize = require('../sequelize')
const { QueryTypes } = require('sequelize')

const Evaluatee = sequelize.models.evaluatee
const Evaluation = sequelize.models.evaluation
const Assessment = sequelize.models.assessment
const User = sequelize.models.user
const Course = sequelize.models.course
const Assessments = sequelize.models.assessment

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        ASSESSMENT_DOES_NOT_EXIST,
        USER_NOT_AUTHORIZED_FOR_OPERATION,
        ASSESSMENT_REVIEW_BAD_REQUEST,
        ASSESSMENT_STATUS_NOT_ALLOWED,
        ASSESSMENT_REVIEW_SUCCESSFUL,
        ALREADY_AN_EVALUATEE,
        SUPERVISOR_SET_SUCCESSFULLY,
        SUPERVISOR_SET_BAD_REQUEST,
        NOT_UNIQUE_COURSE,
        CREATE_ASSESSMENT_BAD_REQUEST,
        ASSESSMENT_CREATED_SUCCESSFULLY,
        GET_ASSESSMENTS_SUCCESSFULLY,
        GET_EVALUATEES_SUCCESSFULLY,
        GET_EVALUATEES_BAD_REQUEST,
        GET_ASSESSMENTS_BY_SUPERVISOR_BAD_REQUEST,
        INVALID_EVALUATEE_PROVIDED,
        INVALID_ASSESSMENT_PROVIDED,
        LIST_OF_EVALUATED_CLASSES_CREATED,
        LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
    },
} = require('../config/index.config')

const { sendMail } = require('../mailer')
const generateNewOutlinedScheduleEmail = require('../utils/generateNewOutlinedScheduleEmail')


module.exports.reviewAssessment = async (req, res) => {
    try {
        if (!req.body.assessment_id) {
            return res
                .status(StatusCodes[ASSESSMENT_REVIEW_BAD_REQUEST])
                .send({ ASSESSMENT_REVIEW_BAD_REQUEST })
        }
        const assessment = await Assessment.findByPk(req.body.assessment_id)
        if (!assessment) {
            return res
                .status(StatusCodes[ASSESSMENT_DOES_NOT_EXIST])
                .send({ ASSESSMENT_DOES_NOT_EXIST })
        }
        const userData = JSON.parse(
            atob(req.headers.authorization.slice(7).split('.')[1])
        )
        const authorizedUser = await Assessment.findByPk(
            req.body.assessment_id,
            {
                include: [
                    {
                        model: User,
                        required: true,
                        where: { email: userData.email, user_type: ['dean', 'head of department'] },
                    },
                ],
            }
        )
        if (!authorizedUser) {
            return res
                .status(StatusCodes[USER_NOT_AUTHORIZED_FOR_OPERATION])
                .send({ USER_NOT_AUTHORIZED_FOR_OPERATION })
        }
        if (!['changes required', 'ongoing'].includes(req.body.status.toLowerCase())) {
            return res
                .status(StatusCodes[ASSESSMENT_STATUS_NOT_ALLOWED])
                .send({ ASSESSMENT_STATUS_NOT_ALLOWED })
        }
        assessment.set({
            status:
                req.body.status.charAt(0).toUpperCase() +
                req.body.status.slice(1),
        })
        assessment.save()
        return res
            .status(StatusCodes[ASSESSMENT_REVIEW_SUCCESSFUL])
            .send({ ASSESSMENT_REVIEW_SUCCESSFUL })
    } catch (err) {
        return res
            .status(StatusCodes[ASSESSMENT_REVIEW_BAD_REQUEST])
            .send({ ASSESSMENT_REVIEW_BAD_REQUEST })
    }
}

module.exports.getEvaluateesByAssessment = async (req, res) => {
    const id = req.query.id

    if (!id) {
        return res
            .status(StatusCodes[GET_EVALUATEES_BAD_REQUEST])
            .send({ msg: GET_EVALUATEES_BAD_REQUEST })
    }

    const evaluationTeams = await sequelize.query(
        `select 
    u.id as "member_user_id",
    "academic_title",
    "first_name",
    "last_name",
    "email" as "member_email",
    "evaluateeId" as "evaluatee_id",
    "evaluationId" as "evaluation_id"
    from evaluations e 
    inner join evaluation_teams et 
    on e.id = et."evaluationId" 
    inner join users u 
    on et."userId" = u.id
    where e."assessmentId" = ${id}`,
        { type: QueryTypes.SELECT }
    )

    const evaluatees = await User.findAll({
        attributes: [
            'id',
            'academic_title',
            'first_name',
            'last_name',
            'email',
            'account_status',
            'user_type',
        ],
        include: [
            {
                model: Evaluatee,
                attributes: ['id', 'last_evaluated_date'],
                required: true,
                include: [
                    {
                        model: Evaluation,
                        required: true,
                        where: { assessmentId: id },
                        include: {
                            model: Course,
                            required: true,
                        },
                    },
                ],
            },
        ],
    })

    evaluatees.forEach((e) => {
        const evaluationTeamForEvaluatee = evaluationTeams.filter(
            (et) => et.evaluatee_id === e.evaluatee.id
        )
        e.setDataValue('evaluation_team', evaluationTeamForEvaluatee)
    })

    return res
        .status(StatusCodes[GET_EVALUATEES_SUCCESSFULLY])
        .send({ evaluatees })
}

module.exports.getAssessmentsBySupervisor = async (req, res) => {
    const supervisorId = req.query.id

    if (!supervisorId) {
        return res
            .status(StatusCodes[GET_ASSESSMENTS_BY_SUPERVISOR_BAD_REQUEST])
            .send({ msg: GET_ASSESSMENTS_BY_SUPERVISOR_BAD_REQUEST })
    }

    const assessments = await Assessments.findAll({
        where: { supervisor_id: supervisorId },
    })

    const evaluations = await sequelize.query(
        'select distinct "assessmentId" , "evaluateeId"  FROM evaluations',
        { type: QueryTypes.SELECT }
    )

    assessments.forEach(function (assessment, i) {
        const evaluationsInAssessment = evaluations.filter(
            ({ assessmentId }) => assessmentId === assessment.id
        )

        if (!evaluationsInAssessment) {
            assessments[i].setDataValue('num_of_evaluatees', 0)
        } else {
            assessments[i].setDataValue(
                'num_of_evaluatees',
                evaluationsInAssessment.length
            )
        }
    })
    return res
        .status(StatusCodes[GET_ASSESSMENTS_SUCCESSFULLY])
        .send({ assessments })
}

module.exports.createAssessment = async (req, res) => {
    try {
        await Assessment.create({
            name: req.body.name,
        })
        return res.status(StatusCodes[ASSESSMENT_CREATED_SUCCESSFULLY]).send({
            message: ASSESSMENT_CREATED_SUCCESSFULLY,
        })
    } catch (err) {
        return res.status(StatusCodes[CREATE_ASSESSMENT_BAD_REQUEST]).send({
            message: CREATE_ASSESSMENT_BAD_REQUEST,
        })
    }
}

module.exports.getAssessments = async (req, res) => {
    const assessments = await Assessments.findAll()

    const evaluations = await sequelize.query(
        'select distinct "assessmentId" , "evaluateeId"  FROM evaluations',
        { type: QueryTypes.SELECT }
    )

    assessments.forEach(function (assessment, i) {
        const evaluationsInAssessment = evaluations.filter(
            ({ assessmentId }) => assessmentId === assessment.id
        )

        if (!evaluationsInAssessment) {
            assessments[i].setDataValue('num_of_evaluatees', 0)
        } else {
            assessments[i].setDataValue(
                'num_of_evaluatees',
                evaluationsInAssessment.length
            )
        }
    })
    return res
        .status(StatusCodes[GET_ASSESSMENTS_SUCCESSFULLY])
        .send({ assessments })
}

module.exports.createListOfClasses = async (req, res) => {
    try {
        for (const [userId, subjectsData] of Object.entries(req.body)) {
            for (const properties of subjectsData) {
                const foundEvaluatee = await Evaluatee.findOne({
                    where: {
                        userId: userId,
                    },
                })
                if (!foundEvaluatee) {
                    return res
                        .status(StatusCodes[INVALID_EVALUATEE_PROVIDED])
                        .send({
                            message: INVALID_EVALUATEE_PROVIDED,
                        })
                }
                const foundAssessment = await Assessment.findOne({
                    where: {
                        id: properties.assessment_id,
                    },
                })
                const evaluatedClass = await Course.upsert({
                    course_code: properties.course_code,
                    course_name: properties.course_name,
                })
                if (!foundAssessment) {
                    return res
                        .status(StatusCodes[INVALID_ASSESSMENT_PROVIDED])
                        .send({
                            message: INVALID_ASSESSMENT_PROVIDED,
                        })
                }
                await Evaluation.create({
                    details: properties.details,
                    course_code: evaluatedClass[0].dataValues.course_code,
                    assessmentId: foundAssessment.dataValues.id,
                    evaluateeId: userId,
                    enrolled_students: properties.enrolled_students,
                })
            }
        }
        return res.status(StatusCodes[LIST_OF_EVALUATED_CLASSES_CREATED]).send({
            message: LIST_OF_EVALUATED_CLASSES_CREATED,
        })
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(StatusCodes[NOT_UNIQUE_COURSE]).send({
                message: NOT_UNIQUE_COURSE,
            })
        }
        return res
            .status(StatusCodes[LIST_OF_EVALUATED_CLASSES_BAD_REQUEST])
            .send({
                message: LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
            })
    }
}

module.exports.setAssessmentSupervisor = async (req, res) => {
    try {
        const { email, first_name, last_name } = await User.findOne({
            where: {
                id: req.body.user_id,
            },
        })
        const foundAssessment = await Assessment.findOne({
            where: {
                id: req.body.assessment_id,
            },
        })
        const foundUser = await User.findOne({
            where: {
                id: req.body.user_id,
            },
        })
        if (!foundAssessment) {
            return res.status(StatusCodes[ASSESSMENT_DOES_NOT_EXIST]).send({
                message: ASSESSMENT_DOES_NOT_EXIST,
            })
        }
        if (!foundUser) {
            return res.status(StatusCodes[USER_DOES_NOT_EXIST]).send({
                message: USER_DOES_NOT_EXIST,
            })
        }
        const assessmentWithEvaluatees = await Assessment.findOne({
            where: { id: req.body.assessment_id },
            include: [
                {
                    model: Evaluation,
                    required: true,
                    include: [
                        {
                            model: Evaluatee,
                            attributes: ['userId'],
                            required: true,
                            where: {
                                userId: req.body.user_id,
                            },
                        },
                    ],
                },
            ],
        })
        if (assessmentWithEvaluatees) {
            return res.status(StatusCodes[ALREADY_AN_EVALUATEE]).send({
                message: ALREADY_AN_EVALUATEE,
            })
        }
        foundAssessment.setUser(foundUser)
        sendMail(
            email,
            'TQAS - New assessment requires your attention',
            generateNewOutlinedScheduleEmail(`${first_name} ${last_name}`)
        )
        return res.status(StatusCodes[SUPERVISOR_SET_SUCCESSFULLY]).send({
            message: SUPERVISOR_SET_SUCCESSFULLY,
        })
    } catch (err) {
        return res.status(StatusCodes[SUPERVISOR_SET_BAD_REQUEST]).send({
            message: SUPERVISOR_SET_BAD_REQUEST,
        })
    }
}