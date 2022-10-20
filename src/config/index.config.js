require('dotenv').config()

const config = {
    server: {
        port: process.env.PORT || 8080,
        activationCodeSalt: process.env.ACTIVATION_CODE_SALT || 'saltsalt',
        activationCodeHashRounds: process.env.ACTIVATION_CODE_SALT_ROUND || 10,
    },
    auth: {
        jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2d',
        databaseUrl: process.env.DATABASE_URL || 'database_url',
    },
    responseMessages: {
        ALREADY_LOGGED_IN: 'User already logged in',
        EMAIL_OR_PASSWORD_NOT_MATCH: "Email or password doesn't match",
        USER_LOGGED_IN: 'User logged in',
        ACTIVATION_CODE_SEND: 'Activation code send',
        WRONG_EMAIL_SYNTAX: 'Email should end with pwr.edu.pl',
        WRONG_ACTIVATION_CODE: 'Wrong activation code',
        PASSWORD_REQUIRED: 'Password is required',
        USER_NOT_FOUND: 'User with provided credentials was not found',
        USER_ACTIVATED: 'User was successfully activated',
        CODE_HASHING_ERROR: 'Error while creating activation code',
        MISSING_PARAMETERS: 'Some parameters are missing',
        PASSWORD_HASHING_ERROR: 'Error during account activation',
        USER_ALREADY_ACTIVATED: 'User is already activated',
    },
}

module.exports = config
