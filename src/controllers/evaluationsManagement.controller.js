const sequelize = require('../sequelize')

const EvaluatedClass = sequelize.models.evaluated_class
const Evaluatee = sequelize.models.evaluatee
const Evaluation = sequelize.models.evaluation
const Assessment = sequelize.models.assessment
const User = sequelize.models.user

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
    },
} = require('../config/index.config')

module.exports.createListOfClasses = async (req, res) => {
    try {
        for (const [userId, subjectsData] of Object.entries(req.body)) {
            console.log(userId)
            for (const properties of subjectsData) {
                const foundEvaluatee = await Evaluatee.findOne({
                    where: {
                        userId: userId,
                    },
                })
                if (foundEvaluatee == null) {
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

                if (foundAssessment == null) {
                    return res
                        .status(StatusCodes[INVALID_ASSESSMENT_PROVIDED])
                        .send({
                            message: INVALID_ASSESSMENT_PROVIDED,
                        })
                }
                const evaluatedClass = await EvaluatedClass.upsert({
                    subject_code: properties.subject_code,
                    course_name: properties.course_name,
                })
                await foundEvaluatee.addEvaluated_classes(evaluatedClass[0])
                const evaluation = await Evaluation.create({
                    details: properties.details,
                    subject_code: evaluatedClass[0].dataValues.subject_code,
                    assessmentId: foundAssessment.dataValues.id,
                })
                await evaluation.setAssessment(foundAssessment)
            }
        }
        return res.status(StatusCodes[LIST_OF_EVALUATED_CLASSES_CREATED]).send({
            message: LIST_OF_EVALUATED_CLASSES_CREATED,
        })
    } catch (err) {
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
        if (foundAssessment == null) {
            return res.status(StatusCodes[ASSESSMENT_DOES_NOT_EXIST]).send({
                message: ASSESSMENT_DOES_NOT_EXIST,
            })
        }
        if (foundUser == null) {
            return res.status(StatusCodes[USER_DOES_NOT_EXIST]).send({
                message: USER_DOES_NOT_EXIST,
            })
        }
        const evaluatees = await Assessment.findOne({
            where : {id: req.body.assessment_id},
            include: [
                {
                    model: Evaluation,
                    required: true,
                    include: [
                        {
                            model: EvaluatedClass,
                            required: true,
                            include: [
                                {
                                    model: Evaluatee,
                                    attributes: ['userId'],
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        }
        )
        for (const evaluation of evaluatees.dataValues.evaluations) {
            if (
                evaluation.dataValues.evaluated_class.dataValues.evaluatee
                    .dataValues.userId == req.body.user_id
            ) {
                return res.status(StatusCodes[ALREADY_AN_EVALUATEE]).send({
                    message: ALREADY_AN_EVALUATEE,
                })
            }
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
