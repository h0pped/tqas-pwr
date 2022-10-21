const sequelize = require('../sequelize')

const Wzhz = sequelize.models.wzhz
const User = sequelize.models.user

module.exports.getMembers = async (req, res) => {
    const memebers = await User.findAll({
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

    return res.send(memebers);
}

module.exports.addMember = async (req, res) => {
    const { userId } = req.body

    if (await userExists(userId)) {
        if (!await isUserAlreadyAMember(userId)) {
            try {
                const user = await Wzhz.create({ userId: userId })
                console.log(userId)
                return res.status(200).send({ message: `Member was added.`, user: user })
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(400).send({ message: `This user is already a part of WZHZ group.` })
        }
    } else {
        return res.status(400).send({ message: `User with this ID does not exist.` })
    }
}

module.exports.removeMember = async (req, res) => {
    const { id } = req.body

    if (await memberExists(id)) {
        try {
            await Wzhz.destroy({ where: { id: id } })
            return res.status(200).send({ message: `Member of WZHZ with id ${id} was deleted.` })
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(400).send({ message: `Member of WZHZ with id ${id} does not exist.` })
    }

}

async function isUserAlreadyAMember(id) {
    const records = await Wzhz.findAll({ where: { userId: id}})
    return records.length > 0
}

async function userExists(id) {
    const records = await User.findAll({ where: { id: id}})
    return records.length > 0
}

async function memberExists(id) {
    const records = await Wzhz.findAll({ where: { id: id}})
    return records.length > 0
}