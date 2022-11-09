const sequelize = require('../sequelize')
const { QueryTypes } = require('sequelize')

const Evaluatee = sequelize.models.evaluatee
const Evaluation = sequelize.models.evaluation
const Assessment = sequelize.models.assessment
const User = sequelize.models.user
const Course = sequelize.models.course
const Assesments = sequelize.models.assessment

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        INVALID_EVALUATEE_PROVIDED,
        INVALID_ASSESSMENT_PROVIDED,
        LIST_OF_EVALUATED_CLASSES_CREATED,
        LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
        USER_DOES_NOT_EXIST,
        ASSESSMENT_DOES_NOT_EXIST,
        ALREADY_AN_EVALUATEE,
        SUPERVISOR_SET_SUCCESSFULLY,
        SUPERVISOR_SET_BAD_REQUEST,
        NOT_UNIQUE_COURSE,
        CREATE_ASSESSMENT_BAD_REQUEST,
        ASSESSMENT_CREATED_SUCCESSFULLY,
        GET_ASSESSMENTS_SUCCESSFULLY,
        GET_EVALUATEES_SUCCESSFULLY,
        GET_EVALUATEES_BAD_REQUEST,
    },
} = require('../config/index.config')

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
        return res.status(StatusCodes[SUPERVISOR_SET_SUCCESSFULLY]).send({
            message: SUPERVISOR_SET_SUCCESSFULLY,
        })
    } catch (err) {
        return res.status(StatusCodes[SUPERVISOR_SET_BAD_REQUEST]).send({
            message: SUPERVISOR_SET_BAD_REQUEST,
        })
    }
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
    const assessments = await Assesments.findAll()

    const evaluations = await sequelize.query('select distinct "assessmentId" , "evaluateeId"  FROM evaluations', { type: QueryTypes.SELECT })

    assessments.forEach(function (assessment, i) {
        const evaluation_in_assessment = evaluations.filter(({ assessmentId }) => assessmentId === assessment.id)

        if (!evaluation_in_assessment) {
            assessments[i].setDataValue('num_of_evaluatees', 0)
        } else {
            assessments[i].setDataValue('num_of_evaluatees', evaluation_in_assessment.length)
        }
    })
    return res.status(StatusCodes[GET_ASSESSMENTS_SUCCESSFULLY]).send({ assessments });
}

module.exports.getEvaluateesByAssessment = async (req, res) => {
    const id = req.query.id

    if (!id) {
        return res.status(StatusCodes[GET_EVALUATEES_BAD_REQUEST]).send({ msg: GET_EVALUATEES_BAD_REQUEST })
    }

    const evaluatees = await User.findAll({
        attributes: [
            'id',
            'academic_title',
            'first_name',
            'last_name',
            'email',
            'account_status',
            'user_type'
        ],
        include: [{
            model: Evaluatee,
            attributes: [
                'id',
                'last_evaluated_date',
            ],
            required: true,
            include: [{
                model: Evaluation,
                required: true,
                where: { assessmentId: id },
                include: {
                    model: Course,
                    required: true
                }
            }]
        }]
    })
    return res.status(StatusCodes[GET_EVALUATEES_SUCCESSFULLY]).send({ evaluatees });
}