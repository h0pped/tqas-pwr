const { StatusCodes } = require('http-status-codes')
const { responseMessages } = require('./index.config')

const {
    ALREADY_LOGGED_IN,
    EMAIL_OR_PASSWORD_NOT_MATCH,
    USER_LOGGED_IN,
    ACTIVATION_CODE_SEND,
    WRONG_EMAIL_SYNTAX,
    WRONG_ACTIVATION_CODE,
    PASSWORD_REQUIRED,
    USER_NOT_FOUND,
    USER_ACTIVATED,
    CODE_HASHING_ERROR,
    MISSING_PARAMETERS,
    PASSWORD_HASHING_ERROR,
    USER_ALREADY_ACTIVATED,
    EMAIL_SENDING_ERROR,
    USER_CRUD_SUCCESSFUL,
    USER_ALREADY_EXISTS,
    USER_DOES_NOT_EXIST,
    MEMBER_ADDED,
    ALREADY_A_MEMBER,
    MEMBER_REMOVED,
    MEMEBER_DOES_NOT_EXIST,
    USER_ID_NOT_PROVIDED,
    INVALID_USER_DATA,
    RECOVERY_CODE_SEND,
    WRONG_RECOVERY_CODE,
    PASSWORD_CHANGED,
    RECOVERY_CODE_BLOCKED,
    RECOVERY_CODE_NOT_FOUND,
    EMAIL_ALREADY_EXISTS,
    INVALID_EVALUATEE_PROVIDED,
    INVALID_ASSESSMENT_PROVIDED,
    LIST_OF_EVALUATED_CLASSES_CREATED,
    LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
    ASSESSMENT_DOES_NOT_EXIST,
    ALREADY_AN_EVALUATEE,
    SUPERVISOR_SET_SUCCESSFULLY,
    SUPERVISOR_SET_BAD_REQUEST,
    CREATE_ASSESSMENT_BAD_REQUEST,
    ASSESSMENT_CREATED_SUCCESSFULLY,
    CALLENDAR_ERROR,
    NOT_UNIQUE_COURSE,
    GET_EVALUATEES_BAD_REQUEST,
    GET_ASSESSMENTS_SUCCESSFULLY,
    GET_EVALUATEES_SUCCESSFULLY,
    GET_ASSESSMENTS_BY_SUPERVISOR_BAD_REQUEST,
    GET_PROTOCOLS_BAD_REQUEST
} = responseMessages

module.exports = {
    [ALREADY_LOGGED_IN]: StatusCodes.FORBIDDEN,
    [EMAIL_OR_PASSWORD_NOT_MATCH]: StatusCodes.INTERNAL_SERVER_ERROR,
    [USER_LOGGED_IN]: StatusCodes.OK,
    [ACTIVATION_CODE_SEND]: StatusCodes.OK,
    [WRONG_EMAIL_SYNTAX]: StatusCodes.BAD_REQUEST,
    [WRONG_ACTIVATION_CODE]: StatusCodes.BAD_REQUEST,
    [PASSWORD_REQUIRED]: StatusCodes.BAD_REQUEST,
    [USER_NOT_FOUND]: StatusCodes.NOT_FOUND,
    [USER_ACTIVATED]: StatusCodes.CREATED,
    [CODE_HASHING_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
    [PASSWORD_HASHING_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
    [MISSING_PARAMETERS]: StatusCodes.BAD_REQUEST,
    [USER_ALREADY_ACTIVATED]: StatusCodes.CONFLICT,
    [EMAIL_SENDING_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
    [USER_CRUD_SUCCESSFUL]: StatusCodes.OK,
    [USER_ALREADY_EXISTS]: StatusCodes.INTERNAL_SERVER_ERROR,
    [USER_DOES_NOT_EXIST]: StatusCodes.INTERNAL_SERVER_ERROR,
    [MEMBER_ADDED]: StatusCodes.OK,
    [ALREADY_A_MEMBER]: StatusCodes.CONFLICT,
    [USER_DOES_NOT_EXIST]: StatusCodes.NOT_FOUND,
    [MEMBER_REMOVED]: StatusCodes.OK,
    [MEMEBER_DOES_NOT_EXIST]: StatusCodes.NOT_FOUND,
    [USER_ID_NOT_PROVIDED]: StatusCodes.BAD_REQUEST,
    [INVALID_USER_DATA]: StatusCodes.BAD_REQUEST,
    [RECOVERY_CODE_SEND]: StatusCodes.OK,
    [WRONG_RECOVERY_CODE]: StatusCodes.BAD_REQUEST,
    [PASSWORD_CHANGED]: StatusCodes.OK,
    [RECOVERY_CODE_BLOCKED]: StatusCodes.METHOD_NOT_ALLOWED,
    [RECOVERY_CODE_NOT_FOUND]: StatusCodes.NOT_FOUND,
    [EMAIL_ALREADY_EXISTS]: StatusCodes.CONFLICT,
    [INVALID_EVALUATEE_PROVIDED]: StatusCodes.INTERNAL_SERVER_ERROR,
    [INVALID_ASSESSMENT_PROVIDED]: StatusCodes.INTERNAL_SERVER_ERROR,
    [LIST_OF_EVALUATED_CLASSES_CREATED]: StatusCodes.OK,
    [LIST_OF_EVALUATED_CLASSES_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [ASSESSMENT_DOES_NOT_EXIST]: StatusCodes.INTERNAL_SERVER_ERROR,
    [ALREADY_AN_EVALUATEE]: StatusCodes.INTERNAL_SERVER_ERROR,
    [SUPERVISOR_SET_SUCCESSFULLY]: StatusCodes.OK,
    [SUPERVISOR_SET_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [CREATE_ASSESSMENT_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [ASSESSMENT_CREATED_SUCCESSFULLY]: StatusCodes.OK,
    [CALLENDAR_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
    [NOT_UNIQUE_COURSE]: StatusCodes.INTERNAL_SERVER_ERROR,
    [GET_ASSESSMENTS_SUCCESSFULLY]: StatusCodes.OK,
    [GET_EVALUATEES_SUCCESSFULLY]: StatusCodes.OK,
    [GET_EVALUATEES_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [GET_ASSESSMENTS_BY_SUPERVISOR_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [GET_PROTOCOLS_BAD_REQUEST]: StatusCodes.BAD_REQUEST
}
