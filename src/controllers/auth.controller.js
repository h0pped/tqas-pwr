const jwt = require('jsonwebtoken')

const users = require('../tempData/users')
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
    },
} = require('../config/index.config')

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

module.exports.sendCode = (req, res) => {
    const { email } = req.body
    if (!email.endsWith('pwr.edu.pl')) {
        return res
            .status(StatusCodes[WRONG_EMAIL_SYNTAX])
            .send({ msg: WRONG_EMAIL_SYNTAX })
    }
    return res
        .status(StatusCodes[ACTIVATION_CODE_SEND])
        .send({ msg: ACTIVATION_CODE_SEND, email })
}

module.exports.verifyCode = (req, res) => {
    const { /* email ,*/ code } = req.body
    if (code !== '1234') {
        return res
            .status(StatusCodes[WRONG_ACTIVATION_CODE])
            .send({ msg: WRONG_ACTIVATION_CODE })
    }
    return res.send({ msg: 'Code verified' })
}
