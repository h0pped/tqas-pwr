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
        USER_ID_NOT_PROVIDED:
            'Id of user is required in order to add it to WZHZ group',
        INVALID_USER_DATA: 'Invalid user data provided',
        RECOVERY_CODE_SEND: 'Recovery code was send',
        WRONG_RECOVERY_CODE: 'Wrong recovery code',
        PASSWORD_CHANGED: 'Password was changed',
        RECOVERY_CODE_BLOCKED: 'Recovery code is blocked',
        RECOVERY_CODE_NOT_FOUND: "Recovery code doesn't exist",
        EMAIL_ALREADY_EXISTS: 'User with such email already exists',
        INVALID_EVALUATEE_PROVIDED: 'Evaluatee with a given Id does not exist',
        INVALID_ASSESSMENT_PROVIDED:
            'Assessment with the given ID does not exist',
        LIST_OF_EVALUATED_CLASSES_CREATED:
            'List of classes created successfully',
        ASSESSMENT_DOES_NOT_EXIST: 'Assessment with given id does not exist',
        ALREADY_AN_EVALUATEE:
            'User that is trying to be set as supervisor is already an evaluatee in this assessment',
        SUPERVISOR_SET_SUCCESSFULLY: 'Supervisor set successfully',
        SUPERVISOR_SET_BAD_REQUEST:
            'Invalid data provided in the request for setting supervisor to an assessment',
        LIST_OF_EVALUATED_CLASSES_BAD_REQUEST:
            'Invalid data provided in the request for creating list of classes',
        CREATE_ASSESSMENT_BAD_REQUEST:
            'Invalid data provided in request for creating assessment',
        ASSESSMENT_CREATED_SUCCESSFULLY: 'Assessment created successfully',
        CALLENDAR_ERROR: 'Error while creating callendar file of evaluations',
        NOT_UNIQUE_COURSE:
            'There is a same course (or multiple same courses) of the same teacher being added multiple times for the same assessment',
        GET_EVALUATEES_BAD_REQUEST: 'Id of assesment is required.',
        GET_ASSESSMENTS_BY_SUPERVISOR_BAD_REQUEST:
            'Id of supervisor is required.',
        EVALUATION_DOES_NOT_EXIST: 'Evaluation with given id does not exist',
        UNKNOWN_EVALUATION_REVIEW_STATUS:
            'Unknown evaluation review status provided. Should be accepted or rejected',
        EVALUATION_REVIEW_SUCCESSFUL: 'Evaluation reviewed successfully',
        EVALUATION_REVIEW_BAD_REQUEST:
            'Invalid data provided in the request for reviewing the evaluation',
        USER_NOT_AUTHORIZED_FOR_OPERATION:
            'User not authorized to perform this operation',
        NO_WZHZ_MEMBER_IN_EVALUATION_TEAM:
            'No wzhz members were provided in one of the evaluation teams',
        EVALUATEE_CAN_NOT_BE_IN_OWN_EVALUATION_TEAM:
            'Evaluatee is trying to be set as the evaluation team member of his own evaluation',
        EVALUATION_TEAMS_CREATED_SUCCESSFULLY:
            'Evaluation teams set successfully',
        USER_ALREADY_IN_THE_EVALUATION_TEAM:
            'The user is being added to the same evaluation team more than once',
        EVALUATION_TEAM_BAD_REQUREST:
            'Invalid data provided in the request for assigning evaluation teams',
        EVALUATION_DELETED_SUCCESSFULLY: 'Evaluation deleted successfully',
        EVALUATION_DELETION_BAD_REQUEST:
            'Invalid data provided in the request for deleting the evaluation',
        ASSESSMENT_REVIEW_BAD_REQUEST:
            'Invalid data provided in the request for reviewing the assessment',
        ASSESSMENT_STATUS_NOT_ALLOWED:
            'Unknown assessment review status provided. Should be "changes required" or "ongoing"',
        ASSESSMENT_REVIEW_SUCCESSFUL: 'Assessment reviewed successfully',
        GET_EVALUATIONS_BY_ET_MEMBER_BAD_REQUEST:
            'Id of member is required in order to get evaluations they responsible for.',
        PROTOCOL_NAME_NOT_PROVIDED:
            'The protocol name was not provided in the request for protocol creation',
        PROTOCOL_CREATED_SUCCESSFULLY: 'Protocol was created successfully',
        PROTOCOL_CREATION_BAD_REQUEST:
            'Invalid data provided in the request for creating assessment',
        PROTOCOL_NOT_FOUND: 'Protocol with provided id was not found',
        PROTOCOL_FOUND: 'Protocol found',
        GET_PROTOCOL_BAD_REQUEST:
            'Invalid data provided in the request for getting protocol',
        REMOVE_ET_MEMBER_BAD_REQUEST:
            'userId and evaluationId is required in order to delete evaluation team member.',
        MEMBER_DELETED_SUCCESSFULLY:
            'Evaluation team member successfully removed.',
        MEMBER_DOES_NOT_EXIST: 'Evaluation team member does not exist.',
        GET_EVALUATION_FOR_EVALUATEE_NOT_FOUND:
            'Assessment for this evaluatee was not found',
        REJECTION_COMMENT_FOR_ACCEPTED_EVALUATION:
            'Rejection comment is provided for an accepted evaluation',
        GET_EVALUATIONS_BY_ET_MEMBER_USER_DNE_BAD_REQUEST:
            'User with such id does not exist.',
        GET_EVALUATIONS_BY_ET_MEMBER_NOT_PART_OF_ANY_BAD_REQUEST:
            'Requested user is not a part of any of the evaluation teams.',
        REJECTION_COMMENT_FOR_ACCEPTED_ASSESSMENT:
            'Rejection comment added in the request for accepting the assessment',
        EXPORT_ID_REQUIRED_BAD_REQUEST: 'Id of assessment is required in order to export its schedule.',
        EXPORT_DNE_BAD_REQUEST: 'Assessment with provided id does NOT exist.',
        EXPORT_MUST_BE_APPROVED_FIRST_BAD_REQUEST: 'Requested assessment is not approved yet. You can only export approved schedule of assessment.'
    },
}

module.exports = config
