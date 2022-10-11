const jwt = require('jsonwebtoken')

const users = require('../tempData/users')
const { secret, expiresIn } = require('../config/auth.config')
const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: { EMAIL_OR_PASSWORD_NOT_MATCH, USER_LOGGED_IN },
} = require('../config/index.config')

module.exports.checkAuth = (req, res) => {
    res.send({ msg: 'Hello from auth' })
}

module.exports.signIn = (req, res) => {
    try {
        if (req.user) {
            throw new Error('User already logged in')
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
