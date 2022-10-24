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
    mailer: {
        service: 'Gmail',
        auth: {
            user: process.env.MAILER_EMAIL || 'tqastest@pwr.edu.pl',
            pass: process.env.MAILER_PASSWORD || '123123123',
        },
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
        EMAIL_SENDING_ERROR: 'Error while sending email',
        USER_CRUD_SUCCESSFUL: 'User CRUD successful',
        USER_ALREADY_EXISTS: 'User already exists',
        MEMBER_ADDED: 'Member was added',
        ALREADY_A_MEMBER: 'User is already a member of WZHZ group',
        USER_DOES_NOT_EXIST: 'User with provided ID does not exist',
        MEMBER_REMOVED: 'Member was removed from WZHZ group',
        MEMEBER_DOES_NOT_EXIST: 'Such member of WZHZ does not exist',
        ID_NOT_PROVIDED: 'Id of user is required in order to add it to WZHZ group',
        INVALID_USER_DATA: 'Invalid user data provided'
    },
}

module.exports = config
