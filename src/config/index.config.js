require('dotenv').config()

const config = {
    server: {
        port: process.env.PORT || 8080,
        activationCodeSalt: process.env.ACTIVATION_CODE_SALT || 'saltsalt',
        activationCodeHashRounds:
            Number(process.env.ACTIVATION_CODE_SALT_ROUND) || 10,
    },
    auth: {
        jwtSecretKey: process.env.JWT_SECRET_KEY || 'secret',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2d',
        databaseUrl: process.env.DATABASE_URL || 'database_url',
    },
    recovery: {
        recoveryTime: Number(process.env.PASSWORD_RECOVERY_TIME_MINUTES) || 15,
        attemptsNumber:
            Number(process.env.PASSWORD_RECOVERY_ATTEMPTS_NUMBER) || 3,
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
        CODE_HASHING_ERROR: 'Error while creating code',
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
        USER_ID_NOT_PROVIDED:'Id of user is required in order to add it to WZHZ group',
        INVALID_USER_DATA: 'Invalid user data provided',
        RECOVERY_CODE_SEND: 'Recovery code was send',
        WRONG_RECOVERY_CODE: 'Wrong recovery code',
        PASSWORD_CHANGED: 'Password was changed',
        RECOVERY_CODE_BLOCKED: 'Recovery code is blocked',
        RECOVERY_CODE_NOT_FOUND: "Recovery code doesn't exist",
        EMAIL_ALREADY_EXISTS: 'User with such email already exists',
        INVALID_EVALUATEE_PROVIDED: 'Evaluatee with a given Id does not exist',
        INVALID_ASSESSMENT_PROVIDED: 'Assessment with the given ID does not exist',
        LIST_OF_EVALUATED_CLASSES_CREATED: 'List of classes created successfully',
        ASSESSMENT_DOES_NOT_EXIST: 'Assessment with given id does not exist',
        ALREADY_AN_EVALUATEE: 'User that is trying to be set as supervisor is already an evaluatee in this assessment',
        SUPERVISOR_SET_SUCCESSFULLY: 'Supervisor set successfully',
        SUPERVISOR_SET_BAD_REQUEST: 'Invalid data provided in the request for setting supervisor to an assessment',
        LIST_OF_EVALUATED_CLASSES_BAD_REQUEST: 'Invalid data provided in the request for creating list of classes',
        CALLENDAR_ERROR: 'Error while creating callendar file of evaluations',
        NOT_UNIQUE_COURSE: 'There is a same course (or multiple same courses) of the same teacher being added multiple times for the same assessment',
    },
}

module.exports = config
