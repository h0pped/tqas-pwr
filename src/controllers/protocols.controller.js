const sequelize = require('../sequelize')

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        GET_PROTOCOLS_SUCCESSFULLY,
        GET_PROTOCOLS_BAD_REQUEST
    },
} = require('../config/index.config');

const Evaluation = sequelize.models.evaluation
const EvaluationTeam = sequelize.models.evaluation_team
const Course = sequelize.models.course
const User = sequelize.models.user
const Assessment = sequelize.models.assessment
const Evaluatee = sequelize.models.evaluatee

module.exports.getProtocolsByETMember = async (req, res) => {
    const memberId = req.query.id;

    if (!memberId) {
        return res.status(StatusCodes[GET_PROTOCOLS_BAD_REQUEST]).send({ msg: GET_PROTOCOLS_BAD_REQUEST})
    }

    const evaluationTeams = await EvaluationTeam.findAll({ attributes: ['userId', 'evaluationId'], where: {userId: memberId}});
    const evaluations = await Evaluation.findAll({include:[{model: Assessment}, {model: Evaluatee}, {model: Course}]});
    const users = await User.findAll({attributes: ['id', 'academic_title', 'first_name', 'last_name']});

    evaluationTeams.forEach((et) => {
        et.setDataValue('evaluation', evaluations.find((evaluation) => evaluation.id === et.evaluationId));
        et.setDataValue('evaluatee_full', users.find((user) => user.id === et.getDataValue('evaluation').evaluatee.userId));
        console.log(et.getDataValue('evaluation').evaluatee.userId)
    })

    return res.status(StatusCodes[GET_PROTOCOLS_SUCCESSFULLY]).send({ evaluationTeams });

}