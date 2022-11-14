const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { activationCodeHashRounds } = require('../config/index.config')
const { secret, expiresIn } = require('../config/auth.config')
const StatusCodes = require('../config/statusCodes.config')

const {
    responseMessages: {
        EMAIL_OR_PASSWORD_NOT_MATCH,
        USER_LOGGED_IN,
        ALREADY_LOGGED_IN,
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
    },
} = require('../config/index.config')

const { sendMail } = require('../mailer')

const compareTimestamps = require('../utils/compareTimestamps')
const generateHash = require('../utils/generateHash')
const generateNumber = require('../utils/generateNumber')
const generateActivationCodeEmail = require('../utils/generateActivationCodeEmail')

const sequelize = require('../sequelize')

const UserModel = sequelize.models.user
const ActivationCode = sequelize.models.activation_code

module.exports.checkAuth = (req, res) => {
    res.send({ msg: 'Hello from auth' })
}

module.exports.signIn = async (req, res) => {
    try {
        if (req.user) {
            throw new Error(ALREADY_LOGGED_IN)
        } else {
            const { email: bodyEmail, password } = req.body
            const email = bodyEmail.toLowerCase()
            if (!email || !password) {
                throw new Error(MISSING_PARAMETERS)
            }
            const user = await UserModel.findOne({ where: { email } })
            const userHashedPassword = user.password
            if (!(await bcrypt.compare(password, userHashedPassword))) {
                throw new Error(EMAIL_OR_PASSWORD_NOT_MATCH)
            }
            const token = jwt.sign(
                {
                    email,
                    id: user.id,
                    user_type: user.user_type,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    academic_title: user.academic_title,
                },
                secret,
                {
                    expiresIn,
                }
            )

            return res.status(StatusCodes[USER_LOGGED_IN]).send({
                msg: USER_LOGGED_IN,
                email,
                token,
            })
        }
    } catch (err) {
        return res
            .status(StatusCodes[err.message] || 403)
            .send({ msg: err.message })
    }
}

module.exports.sendCode = async (req, res) => {
    const { email: bodyEmail } = req.body
    const email = bodyEmail.toLowerCase()
    if (!email.endsWith('pwr.edu.pl')) {
        return res
            .status(StatusCodes[WRONG_EMAIL_SYNTAX])
            .send({ msg: WRONG_EMAIL_SYNTAX })
    }
    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res
            .status(StatusCodes[USER_NOT_FOUND])
            .send({ msg: USER_NOT_FOUND })
    }
    if (user.account_status !== 'inactive') {
        return res
            .status(StatusCodes[USER_ALREADY_ACTIVATED])
            .send({ msg: USER_ALREADY_ACTIVATED })
    }

    const hashedCodeFromDb = await ActivationCode.findOne({
        where: {
            userId: user.id,
        },
    })
    if (
        hashedCodeFromDb &&
        compareTimestamps(
            Date.now(),
            hashedCodeFromDb.updatedAt,
            15 * 60 * 1000
        )
    ) {
        return res.send({ msg: 'activation code was already sent' })
    }
    const code = generateNumber(1000, 9000).toString()

    if (
        hashedCodeFromDb &&
        !compareTimestamps(
            Date.now(),
            hashedCodeFromDb.updatedAt,
            15 * 60 * 1000
        )
    ) {
        generateHash(
            code,
            activationCodeHashRounds,
            async (hash) => {
                hashedCodeFromDb.code = hash
                try {
                    await hashedCodeFromDb.save()
                    await sendMail(
                        'notawril@gmail.com',
                        'TQAS - Activation code',
                        generateActivationCodeEmail(
                            `${user.first_name} ${user.last_name}`,
                            code
                        )
                    )
                } catch (err) {
                    return res
                        .status(StatusCodes[EMAIL_SENDING_ERROR])
                        .send({ msg: EMAIL_SENDING_ERROR })
                }
                return res
                    .status(StatusCodes[ACTIVATION_CODE_SEND])
                    .send({ msg: ACTIVATION_CODE_SEND, email, hash })
            },
            () => {
                return res
                    .status(StatusCodes[CODE_HASHING_ERROR])
                    .send({ msg: CODE_HASHING_ERROR })
            }
        )
    } else {
        generateHash(
            code,
            activationCodeHashRounds,
            async (hash) => {
                try {
                    await ActivationCode.create({
                        userId: user.id,
                        code: hash,
                    })
                    sendMail(
                        'notawril@gmail.com',
                        'TQAS - Activation code',
                        generateActivationCodeEmail(
                            `${user.first_name} ${user.last_name}`,
                            code
                        )
                    )
                } catch (err) {
                    return res
                        .status(StatusCodes[EMAIL_SENDING_ERROR])
                        .send({ msg: EMAIL_SENDING_ERROR })
                }

                return res
                    .status(StatusCodes[ACTIVATION_CODE_SEND])
                    .send({ msg: ACTIVATION_CODE_SEND, email, hash })
            },
            () => {
                return res
                    .status(StatusCodes[CODE_HASHING_ERROR])
                    .send({ msg: CODE_HASHING_ERROR })
            }
        )
    }
}

module.exports.verifyCode = async (req, res) => {
    const { email: bodyEmail, code } = req.body
    const email = bodyEmail.toLowerCase()
    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res
            .status(StatusCodes[USER_NOT_FOUND])
            .send({ msg: USER_NOT_FOUND })
    }
    const hash = await ActivationCode.findOne({
        where: {
            userId: user.id,
        },
    })
    if (!(await bcrypt.compare(code, hash.code))) {
        return res
            .status(StatusCodes[WRONG_ACTIVATION_CODE])
            .send({ msg: WRONG_ACTIVATION_CODE })
    }
    return res.send({ msg: 'Code verified' })
}

module.exports.activateAccount = async (req, res) => {
    const { email: bodyEmail, password, code } = req.body
    const email = bodyEmail.toLowerCase()
    if (!email.endsWith('pwr.edu.pl')) {
        return res
            .status(StatusCodes[WRONG_EMAIL_SYNTAX])
            .send({ msg: WRONG_EMAIL_SYNTAX })
    }
    if (!password) {
        return res
            .status(StatusCodes[PASSWORD_REQUIRED])
            .send({ msg: PASSWORD_REQUIRED })
    }
    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res
            .status(StatusCodes[USER_NOT_FOUND])
            .send({ msg: USER_NOT_FOUND })
    }
    const hash = await ActivationCode.findOne({
        where: {
            userId: user.id,
        },
    })
    if (!(await bcrypt.compare(code, hash.code))) {
        return res
            .status(StatusCodes[WRONG_ACTIVATION_CODE])
            .send({ msg: WRONG_ACTIVATION_CODE })
    }

    generateHash(
        password,
        activationCodeHashRounds,
        async (passwordHash) => {
            user.password = passwordHash
            user.account_status = 'active'
            await user.save()

            return res.status(StatusCodes[USER_ACTIVATED]).send({
                msg: USER_ACTIVATED,
            })
        },
        () => {
            return res
                .status(StatusCodes[PASSWORD_HASHING_ERROR])
                .send({ msg: PASSWORD_HASHING_ERROR })
        }
    )
}
