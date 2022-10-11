const { responseMessages } = require('./index.config')

const { StatusCodes } = require('http-status-codes')

const { ALREADY_LOGGED_IN, EMAIL_OR_PASSWORD_NOT_MATCH, USER_LOGGED_IN } =
    responseMessages
module.exports = {
    [ALREADY_LOGGED_IN]: StatusCodes.FORBIDDEN,
    [EMAIL_OR_PASSWORD_NOT_MATCH]: StatusCodes.INTERNAL_SERVER_ERROR,
    [USER_LOGGED_IN]: StatusCodes.ACCEPTED,
}
