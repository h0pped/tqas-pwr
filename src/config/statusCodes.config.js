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
    UNKNOWN_EVALUATION_REVIEW_STATUS,
    EVALUATION_REVIEW_SUCCESSFUL,
    EVALUATION_REVIEW_BAD_REQUEST,
    USER_NOT_AUTHORIZED_FOR_OPERATION,
    NO_WZHZ_MEMBER_IN_EVALUATION_TEAM,
    EVALUATION_DOES_NOT_EXIST,
    EVALUATEE_CAN_NOT_BE_IN_OWN_EVALUATION_TEAM,
    EVALUATION_TEAMS_CREATED_SUCCESSFULLY,
    USER_ALREADY_IN_THE_EVALUATION_TEAM,
    EVALUATION_TEAM_BAD_REQUREST,
    EVALUATION_DELETED_SUCCESSFULLY,
    EVALUATION_DELETION_BAD_REQUEST,
    ASSESSMENT_REVIEW_BAD_REQUEST,
    ASSESSMENT_STATUS_NOT_ALLOWED,
    ASSESSMENT_REVIEW_SUCCESSFUL,
    GET_EVALUATIONS_BY_ET_MEMBER_BAD_REQUEST,
    GET_EVALUATIONS_BY_ET_MEMBER_SUCCESSFULLY,
    PROTOCOL_NAME_NOT_PROVIDED,
    PROTOCOL_CREATED_SUCCESSFULLY,
    PROTOCOL_CREATION_BAD_REQUEST,
    PROTOCOL_NOT_FOUND,
    PROTOCOL_FOUND,
    GET_PROTOCOL_BAD_REQUEST,
    REMOVE_ET_MEMBER_BAD_REQUEST,
    MEMBER_DELETED_SUCCESSFULLY,
    MEMBER_DOES_NOT_EXIST,
    GET_EVALUATION_FOR_EVALUATEE_NOT_FOUND,
    GET_EVALUATION_FOR_EVALUATEE_SUCCESSFULLY,
    GET_EVALUATIONS_BY_ET_MEMBER_USER_DNE_BAD_REQUEST,
    GET_EVALUATIONS_BY_ET_MEMBER_NOT_PART_OF_ANY_BAD_REQUEST,
    REJECTION_COMMENT_FOR_ACCEPTED_ASSESSMENT,
    REJECTION_COMMENT_FOR_ACCEPTED_EVALUATION,
    PROTOCOL_PDF_BAD_REQUEST,
    PROTOCOL_GENERATED_SUCCESSFULLY,
    NO_FILLED_PROTOCOL,
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
    [UNKNOWN_EVALUATION_REVIEW_STATUS]: StatusCodes.BAD_REQUEST,
    [EVALUATION_REVIEW_SUCCESSFUL]: StatusCodes.OK,
    [EVALUATION_REVIEW_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [USER_NOT_AUTHORIZED_FOR_OPERATION]: StatusCodes.UNAUTHORIZED,
    [NO_WZHZ_MEMBER_IN_EVALUATION_TEAM]: StatusCodes.INTERNAL_SERVER_ERROR,
    [EVALUATION_DOES_NOT_EXIST]: StatusCodes.INTERNAL_SERVER_ERROR,
    [EVALUATEE_CAN_NOT_BE_IN_OWN_EVALUATION_TEAM]:
        StatusCodes.INTERNAL_SERVER_ERROR,
    [EVALUATION_TEAMS_CREATED_SUCCESSFULLY]: StatusCodes.OK,
    [USER_ALREADY_IN_THE_EVALUATION_TEAM]: StatusCodes.INTERNAL_SERVER_ERROR,
    [EVALUATION_TEAM_BAD_REQUREST]: StatusCodes.BAD_REQUEST,
    [EVALUATION_DELETED_SUCCESSFULLY]: StatusCodes.OK,
    [EVALUATION_DELETION_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [ASSESSMENT_REVIEW_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [ASSESSMENT_STATUS_NOT_ALLOWED]: StatusCodes.BAD_REQUEST,
    [ASSESSMENT_REVIEW_SUCCESSFUL]: StatusCodes.OK,
    [GET_EVALUATIONS_BY_ET_MEMBER_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [GET_EVALUATIONS_BY_ET_MEMBER_SUCCESSFULLY]: StatusCodes.OK,
    [PROTOCOL_NAME_NOT_PROVIDED]: StatusCodes.BAD_REQUEST,
    [PROTOCOL_CREATED_SUCCESSFULLY]: StatusCodes.OK,
    [PROTOCOL_CREATION_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [PROTOCOL_NOT_FOUND]: StatusCodes.INTERNAL_SERVER_ERROR,
    [PROTOCOL_FOUND]: StatusCodes.OK,
    [GET_PROTOCOL_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [REMOVE_ET_MEMBER_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [MEMBER_DELETED_SUCCESSFULLY]: StatusCodes.OK,
    [MEMBER_DOES_NOT_EXIST]: StatusCodes.BAD_REQUEST,
    [GET_EVALUATION_FOR_EVALUATEE_NOT_FOUND]: StatusCodes.BAD_REQUEST,
    [GET_EVALUATION_FOR_EVALUATEE_SUCCESSFULLY]: StatusCodes.OK,
    [GET_EVALUATIONS_BY_ET_MEMBER_USER_DNE_BAD_REQUEST]:
        StatusCodes.BAD_REQUEST,
    [GET_EVALUATIONS_BY_ET_MEMBER_NOT_PART_OF_ANY_BAD_REQUEST]:
        StatusCodes.BAD_REQUEST,
    [REJECTION_COMMENT_FOR_ACCEPTED_ASSESSMENT]: StatusCodes.BAD_REQUEST,
    [REJECTION_COMMENT_FOR_ACCEPTED_EVALUATION]: StatusCodes.BAD_REQUEST,
    [PROTOCOL_PDF_BAD_REQUEST]: StatusCodes.BAD_REQUEST,
    [PROTOCOL_GENERATED_SUCCESSFULLY]: StatusCodes.OK,
    [NO_FILLED_PROTOCOL]: StatusCodes.INTERNAL_SERVER_ERROR,
}
