const sequelize = require('../sequelize')
const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        USER_CRUD_SUCCESSFUL,
        USER_ALREADY_EXISTS,
        USER_DOES_NOT_EXIST,
        INVALID_USER_DATA,
        EMAIL_ALREADY_EXISTS,
    },
} = require('../config/index.config')

const User = sequelize.models.user
const Evaluatee = sequelize.models.evaluatee
const Wzhz = sequelize.models.wzhz

module.exports.getUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: [
            'id',
            'first_name',
            'last_name',
            'academic_title',
            'user_type',
            'email',
            'account_status',
            'department'
        ],
        include: [
            {
                model: Evaluatee,
                attributes: ['last_evaluated_date'],
            },
        ],
    })
    return res.status(StatusCodes[USER_CRUD_SUCCESSFUL]).send(users)
}

module.exports.updateUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: {
                id: req.body.id,
            },
            include: [
                {
                    model: Evaluatee,
                    required: true,
                },
            ],
        })
        foundUser.set({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            academic_title: req.body.academic_title,
            user_type: req.body.user_type,
            email: req.body.email,
            department: req.body.department
        })
        await foundUser.save()
        if (req.body.last_evaluated_date) {
            const dateEvaluated = req.body.last_evaluated_date
                .replaceAll('.', '/')
                .replaceAll('-', '/')
                .split('/')
            foundUser.evaluatee.set({
                last_evaluated_date: new Date(
                    dateEvaluated[2],
                    Number(dateEvaluated[1]) - 1,
                    dateEvaluated[0]
                ).toISOString(),
            })
            await foundUser.evaluatee.save()
        }
        return res
            .status(StatusCodes[USER_CRUD_SUCCESSFUL])
            .send({ message: USER_CRUD_SUCCESSFUL, user: foundUser.dataValues })
    } catch (err) {
        if (err.name == 'SequelizeUniqueConstraintError') {
            return res.status(
                StatusCodes[EMAIL_ALREADY_EXISTS]).send({
                    message: EMAIL_ALREADY_EXISTS,
                })
        }
        return res
            .status(StatusCodes[USER_DOES_NOT_EXIST])
            .send({ message: USER_DOES_NOT_EXIST })
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            academic_title: req.body.academic_title,
            email: req.body.email,
            password: null,
            account_status: 'inactive',
            status_date: Date.now(),
            user_type: req.body.user_type,
            department: req.body.department
        })
        const evaluatee = await Evaluatee.create({
            last_evaluated_date: req.body.last_evaluated_date,
        })
        user.setEvaluatee(evaluatee)
        return res
            .status(StatusCodes[USER_CRUD_SUCCESSFUL])
            .send({ message: USER_CRUD_SUCCESSFUL, userId: user.dataValues.id })
    } catch (err) {
        if (err.name == 'SequelizeUniqueConstraintError') {
            return res
                .status(StatusCodes[USER_ALREADY_EXISTS])
                .send({ message: USER_ALREADY_EXISTS })
        }
        return res
            .status(StatusCodes[INVALID_USER_DATA])
            .send({ message: INVALID_USER_DATA })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const usr = await User.findOne({
            where: {
                id: req.body.id,
            },
            include: [{ model: Wzhz }],
        })
        // Softdelete on product table
        if (usr.wzhz) {
            usr.wzhz.destroy()
        }
        
        const user = await User.destroy({
            where: {
                id: req.body.id,
            },
        })
        return res
            .status(StatusCodes[USER_CRUD_SUCCESSFUL])
            .send({
                message: user == 1 ? USER_CRUD_SUCCESSFUL : USER_DOES_NOT_EXIST,
            })
    } catch (err) {
        return res.status(StatusCodes[USER_DOES_NOT_EXIST]).send({ err })
    }
}
