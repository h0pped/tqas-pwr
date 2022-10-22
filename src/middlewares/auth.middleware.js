require('dotenv').config()

const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { secret } = require('../config/auth.config')

module.exports.authMiddleware = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        jwt.verify(bearerToken, secret, (err) => {
            if (err) {
                return res.sendStatus(StatusCodes.UNAUTHORIZED)
            } else {
                next()
            }
        })

        next()
    } else {
        return res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
}

module.exports.checkAuthMiddleware = (req, res, next) => {
    const bearerHeader = req.headers['Authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        jwt.verify(bearerToken, secret, (err, result) => {
            if (!err && result) {
                req.user = result
            }
        })
    }
    next()
}
