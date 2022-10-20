const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../tempData/users')
const { activationCodeHashRounds } = require('../config/index.config')
const { secret, expiresIn } = require('../config/auth.config')
const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        EMAIL_OR_PASSWORD_NOT_MATCH,
        USER_LOGGED_IN,
        ALREADY_LOGGED_IN,
        ACTIVATION_CODE_SEND,
        WRONG_EMAIL_SYNTAX,
        WRONG_ACTIVATION_CODE,
        PASSWORD_REQUIRED,
        USER_NOT_FOUND,
        USER_ACTIVATED,
        CODE_HASHING_ERROR,
    },
} = require('../config/index.config')

const sequelize = require('../sequelize')
const UserModel = sequelize.models.user
const ActivationCode = sequelize.models.activation_code

module.exports.checkAuth = (req, res) => {
    res.send({ msg: 'Hello from auth' })
}

module.exports.signIn = (req, res) => {
    try {
        if (req.user) {
            throw new Error(ALREADY_LOGGED_IN)
        } else {
            const { email, password } = req.body
            if (!email || !password || users[email]?.password !== password) {
                throw new Error(EMAIL_OR_PASSWORD_NOT_MATCH)
            }
            const token = jwt.sign(
                {
                    email,
                },
                secret,
                {
                    expiresIn,
                }
            )
            return res.status(StatusCodes[USER_LOGGED_IN]).send({
                msg: USER_LOGGED_IN,
                email,
                token,
            })
        }
    } catch (err) {
        return res
            .status(StatusCodes[err.message] || 403)
            .send({ msg: err.message })
    }
}

module.exports.sendCode = async (req, res) => {
    const { email } = req.body
    if (!email.endsWith('pwr.edu.pl')) {
        return res
            .status(StatusCodes[WRONG_EMAIL_SYNTAX])
            .send({ msg: WRONG_EMAIL_SYNTAX })
    }
    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res
            .status(StatusCodes[USER_NOT_FOUND])
            .send({ msg: USER_NOT_FOUND })
    }

    const hashedCodeFromDb = await ActivationCode.findOne({
        where: {
            userId: user.id,
        },
    })
    if (hashedCodeFromDb) {
        console.log(hashedCodeFromDb)
    } else {
        //random 4-digit code
        const code = Math.floor(1000 + Math.random() * 9000).toString()
        bcrypt.genSalt(activationCodeHashRounds, function (err, salt) {
            bcrypt.hash(code, salt, async function (err, hash) {
                if (err) {
                    return res
                        .status(StatusCodes[CODE_HASHING_ERROR])
                        .send({ msg: CODE_HASHING_ERROR })
                }
                await ActivationCode.create({
                    userId: user.id,
                    code: hash,
                })
                console.log('-----------------------------------')
                console.log(code)
                console.log('-----------------------------------')
                return res
                    .status(StatusCodes[ACTIVATION_CODE_SEND])
                    .send({ msg: ACTIVATION_CODE_SEND, email, hash })
            })
        })
    }
}

module.exports.verifyCode = async (req, res) => {
    const { email, code } = req.body
    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res
            .status(StatusCodes[USER_NOT_FOUND])
            .send({ msg: USER_NOT_FOUND })
    }
    const hash = await ActivationCode.findOne({
        where: {
            userId: user.id,
        },
    })
    const isSameCode = await bcrypt.compare(code, hash.code)
    if (!isSameCode) {
        return res
            .status(StatusCodes[WRONG_ACTIVATION_CODE])
            .send({ msg: WRONG_ACTIVATION_CODE })
    }
    return res.send({ msg: 'Code verified' })
}
module.exports.activateAccount = async (req, res) => {
    const { email, password, code } = req.body
    if (!email.endsWith('pwr.edu.pl')) {
        return res
            .status(StatusCodes[WRONG_EMAIL_SYNTAX])
            .send({ msg: WRONG_EMAIL_SYNTAX })
    }
    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res
            .status(StatusCodes[USER_NOT_FOUND])
            .send({ msg: USER_NOT_FOUND })
    }
    const hash = await ActivationCode.findOne({
        where: {
            userId: user.id,
        },
    })
    const isSameCode = await bcrypt.compare(code, hash.code)
    if (!isSameCode) {
        return res
            .status(StatusCodes[WRONG_ACTIVATION_CODE])
            .send({ msg: WRONG_ACTIVATION_CODE })
    }
    if (!password) {
        return res
            .status(StatusCodes[PASSWORD_REQUIRED])
            .send({ msg: PASSWORD_REQUIRED })
    }

    res.status(StatusCodes[USER_ACTIVATED]).send({ msg: USER_ACTIVATED })
}
