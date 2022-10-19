const sequelize = require('../sequelize')

const User = sequelize.models.user
const Evaluatee = sequelize.models.evaluatee

module.exports.getUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: [
            'id',
            'first_name',
            'last_name',
            'academic_title',
            'user_type',
        ],
        include: [
            {
                model: Evaluatee,
                required: true,
                attributes: ['last_evaluated_date'],
            },
        ],
    })
    console.log(users.every((user) => user instanceof User)) // true
    console.log('All users:', JSON.stringify(users, null, 2))
    return res.send(users)
}

module.exports.updateUser = async (req, res) => {
    const users = await User.findAll({
        where: {
            id: req.body.id,
        },
        include: [
            {
                model: Evaluatee,
                required: true,
                attributes: ['last_evaluated_date'],
            },
        ],
    })
    users[0].set({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        academic_title: req.body.academic_title,
        user_type: req.body.user_type,
        email: req.body.email,
    })
    users[0].evaluatee.set({
        last_evaluated_date: req.body.last_evaluated_date,
    })
    await users[0].save()
    res.send(users)
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
        })
        const evaluatee = await Evaluatee.create({
            last_evaluated_date: req.body.last_evaluated_date,
        })
        user.setEvaluatee(evaluatee)
        let data = user.dataValues
        data.evaluatee = evaluatee.dataValues
        return res.send({msg: 'User Created'})
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({where: {
            id: req.body.id
        }})
        console.log(user)
        return res.send({deleted: user == 1 ? true : false})
    } catch (err) {
        return res.status(500).send(err)
    }
}