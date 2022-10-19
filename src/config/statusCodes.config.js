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
}
