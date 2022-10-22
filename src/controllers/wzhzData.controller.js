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

    if (!userId) {
        return res
            .status(StatusCodes[ID_NOT_PROVIDED])
            .send({ msg: ID_NOT_PROVIDED });
    }

    if (!(await isUserExisting(userId))) {
        return res
            .status(StatusCodes[USER_DOES_NOT_EXIST])
            .send({ msg: USER_DOES_NOT_EXIST })
    }

    if (await isUserAlreadyAMember(userId)) {
        return res
            .status(StatusCodes[ALREADY_A_MEMBER])
            .send({ msg: ALREADY_A_MEMBER })
    }

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
}


module.exports.removeMember = async (req, res) => {
    const { id } = req.body

    if (!(await isMemberExisting(id))) {
        return res
            .status(StatusCodes[MEMEBER_DOES_NOT_EXIST])
            .send({ msg: MEMEBER_DOES_NOT_EXIST })
    }

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
}

async function isUserAlreadyAMember(id) {
    const records = await Wzhz.findAll({ where: { userId: id } })
    return records.length > 0
}

async function isUserExisting(id) {
    const records = await User.findAll({ where: { id: id } })
    return records.length > 0
}

async function isMemberExisting(id) {
    const records = await Wzhz.findAll({ where: { id: id } })
    return records.length > 0
}