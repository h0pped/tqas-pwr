const sequelize = require('../sequelize')

const User = sequelize.models.user
const Protocol = sequelize.models.protocol

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        USER_NOT_AUTHORIZED_FOR_OPERATION,
        PROTOCOL_NAME_NOT_PROVIDED,
        PROTOCOL_CREATED_SUCCESSFULLY,
        PROTOCOL_CREATION_BAD_REQUEST,
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
