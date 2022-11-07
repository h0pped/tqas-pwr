const { QueryTypes } = require('sequelize')
const sequelize = require('../sequelize')

const Assesments = sequelize.models.assessment
const Evaluation = sequelize.models.evaluation
const Evaluatee = sequelize.models.evaluatee
const User = sequelize.models.user
const Course = sequelize.models.course

module.exports.getAssesments = async (req, res) => {
    var assesments = await Assesments.findAll()

    const evaluations = await sequelize.query('select distinct "assessmentId" , "evaluateeId"  FROM evaluations' , { type: QueryTypes.SELECT })

    assesments.forEach(function (assesment, i) {
        const evaluation_in_assesment = evaluations.filter(evaluation => evaluation.assessmentId === assesment.id)

        if (evaluation_in_assesment === undefined) {
            assesments[i].setDataValue('num_of_evaluatees', 0)
        } else {
            assesments[i].setDataValue('num_of_evaluatees', evaluation_in_assesment.length)
        }
    })
    return res.send(assesments);
}

module.exports.getEvaluateesByAssesment = async (req, res) => {
    const { id } = req.body


    if (id === undefined) {
        return res.send({ msg: 'Id of assesment is required.' })
    }

    const assesments = await User.findAll({
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
                    model: Course ,
                    required: true
                }
            }]
        }]
    })
    return res.send(assesments);
}