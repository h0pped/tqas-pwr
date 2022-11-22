const sequelize = require('../sequelize')

const User = sequelize.models.user
const Protocol = sequelize.models.protocol
const Evaluation = sequelize.models.evaluation

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
                where: { evaluationId: req.query.evaluationId },
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
        const protocol = evaluation.getProtocol()
        if (!protocol) {
            return res
                .status(StatusCodes[PROTOCOL_NOT_FOUND])
                .send({ PROTOCOL_NOT_FOUND })
        }
        const protocolJson = JSON.parse(protocol.getDataValue('protocol_json'))
        return res
            .status(StatusCodes[PROTOCOL_FOUND])
            .send({ ...protocol.dataValues })
    } catch (err) {
        return res
            .status(StatusCodes[GET_PROTOCOL_BAD_REQUEST])
            .send({ GET_PROTOCOL_BAD_REQUEST })
    }
}
