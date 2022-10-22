const sequelize = require('../sequelize')
const StatusCodes = require('../config/statusCodes.config')

const {
    responseMessages: {
        MEMBER_ADDED,
        ALREADY_A_MEMBER,
        USER_DOES_NOT_EXIST,
        MEMBER_REMOVED,
        MEMEBER_DOES_NOT_EXIST,
        ID_NOT_PROVIDED
    },
} = require('../config/index.config')

const Wzhz = sequelize.models.wzhz
const User = sequelize.models.user

module.exports.getMembers = async (req, res) => {
    const members = await User.findAll({
        attributes: [
            'id',
            'academic_title',
            'first_name',
            'last_name',
            'email'
        ],
        include: {
            model: Wzhz,
            required: true
        }
    })

    return res.send(members);
}

module.exports.addMember = async (req, res) => {
    const { userId } = req.body

    if (userId) {
        if (await userExists(userId)) {
            if (!await isUserAlreadyAMember(userId)) {
                try {
                    const user = await Wzhz.create({ userId: userId })
                    console.log(userId)
                    return res
                        .status(StatusCodes[MEMBER_ADDED])
                        .send({
                            msg: MEMBER_ADDED,
                            user: user
                        })
                } catch (err) {
                    return res
                        .status(StatusCodes[err.message] || 500)
                        .send({ msg: err.message });
                }
            } else {
                return res
                    .status(StatusCodes[ALREADY_A_MEMBER])
                    .send({ msg: ALREADY_A_MEMBER })
            }
        } else {
            return res
                .status(StatusCodes[USER_DOES_NOT_EXIST])
                .send({ msg: USER_DOES_NOT_EXIST })
        }
    } else {
        return res
            .status(StatusCodes[ID_NOT_PROVIDED])
            .send({ msg: ID_NOT_PROVIDED });
    }
}

module.exports.removeMember = async (req, res) => {
    const { id } = req.body

    if (await memberExists(id)) {
        try {
            await Wzhz.destroy({ where: { id: id } })
            return res
                .status(StatusCodes[MEMBER_REMOVED])
                .send({ msg: MEMBER_REMOVED })
        } catch (err) {
            return res
                .status(StatusCodes[err.message] || 500)
                .send({ msg: err.message });
        }
    } else {
        return res
            .status(StatusCodes[MEMEBER_DOES_NOT_EXIST])
            .send({ msg: MEMEBER_DOES_NOT_EXIST })
    }

}

async function isUserAlreadyAMember(id) {
    const records = await Wzhz.findAll({ where: { userId: id } })
    return records.length > 0
}

async function userExists(id) {
    const records = await User.findAll({ where: { id: id } })
    return records.length > 0
}

async function memberExists(id) {
    const records = await Wzhz.findAll({ where: { id: id } })
    return records.length > 0
}