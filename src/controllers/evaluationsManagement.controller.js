const sequelize = require('../sequelize')

const Evaluatee = sequelize.models.evaluatee
const Evaluation = sequelize.models.evaluation
const Assessment = sequelize.models.assessment
const Course = sequelize.models.course

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        INVALID_EVALUATEE_PROVIDED,
        INVALID_ASSESSMENT_PROVIDED,
        LIST_OF_EVALUATED_CLASSES_CREATED,
        LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
        CREATE_ASSESSMENT_BAD_REQUEST,
        ASSESSMENT_CREATED_SUCCESSFULLY,
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
                const evaluatedClass = await Course.upsert(
                    {
                        course_code: properties.course_code,
                        course_name: properties.course_name,
                    }
                )
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
                    enrolled_students: properties.enrolled_students
                })
            }
        }
        return res.status(StatusCodes[LIST_OF_EVALUATED_CLASSES_CREATED]).send({
            message: LIST_OF_EVALUATED_CLASSES_CREATED,
        })
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res
                .status(StatusCodes[NOT_UNIQUE_COURSE])
                .send({
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
