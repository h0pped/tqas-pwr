const { StatusCodes } = require('http-status-codes')
const { responseMessages } = require('./index.config')

const {
    ALREADY_LOGGED_IN,
    EMAIL_OR_PASSWORD_NOT_MATCH,
    USER_LOGGED_IN,
    ACTIVATION_CODE_SEND,
    WRONG_EMAIL_SYNTAX,
    WRONG_ACTIVATION_CODE,
    USER_CRUD_SUCCESSFUL,
    USER_ALREADY_EXISTS,
    USER_DOES_NOT_EXIST
} = responseMessages

module.exports = {
    [ALREADY_LOGGED_IN]: StatusCodes.FORBIDDEN,
    [EMAIL_OR_PASSWORD_NOT_MATCH]: StatusCodes.INTERNAL_SERVER_ERROR,
    [USER_LOGGED_IN]: StatusCodes.OK,
    [ACTIVATION_CODE_SEND]: StatusCodes.OK,
    [WRONG_EMAIL_SYNTAX]: StatusCodes.BAD_REQUEST,
    [WRONG_ACTIVATION_CODE]: StatusCodes.BAD_REQUEST,
    [USER_CRUD_SUCCESSFUL]: StatusCodes.OK,
    [USER_ALREADY_EXISTS]: StatusCodes.INTERNAL_SERVER_ERROR,
    [USER_DOES_NOT_EXIST]: StatusCodes.INTERNAL_SERVER_ERROR
}
