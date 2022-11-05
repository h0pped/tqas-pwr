const sequelize = require('../sequelize')

const Assesments = sequelize.models.assessment
const Evaluation = sequelize.models.evaluation
const Evaluatee = sequelize.models.evaluatee
const EvaluatedClasses = sequelize.models.evaluated_class

module.exports.getAssesments = async (req, res) => {
    const assesments = await Assesments.findAll({
        include: {
            model: Evaluation,
        }
    })
    return res.send(assesments);
}

module.exports.getEvaluatees = async (req, res) => {
    const { id } = req.query


    if (id === undefined) {
        return res.send({ msg: 'id is required' })
    }

    const assesments = await Evaluatee.findAll({
        include: [{ model: EvaluatedClasses, required: true, include: { model: Evaluation, required: true, where: { assessmentId: id } } }],
    }
    )
    return res.send(assesments);
}