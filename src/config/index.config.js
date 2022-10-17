require('dotenv').config()

const config = {
    server: {
        port: process.env.PORT || 8080,
    },
    auth: {
        jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2d',
    },
    responseMessages: {
        ALREADY_LOGGED_IN: 'User already logged in',
        EMAIL_OR_PASSWORD_NOT_MATCH: "Email or password doesn't match",
        USER_LOGGED_IN: 'User logged in',
    },
}

module.exports = config
