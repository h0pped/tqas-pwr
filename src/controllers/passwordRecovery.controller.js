const bcrypt = require('bcrypt')

const {
    responseMessages: {
        WRONG_EMAIL_SYNTAX,
        USER_NOT_FOUND,
        MISSING_PARAMETERS,
        RECOVERY_CODE_SEND,
        CODE_HASHING_ERROR,
        WRONG_RECOVERY_CODE,
        PASSWORD_HASHING_ERROR,
        PASSWORD_CHANGED,
        PASSWORD_REQUIRED,
        RECOVERY_CODE_BLOCKED,
        RECOVERY_CODE_NOT_FOUND,
    },
} = require('../config/index.config')
const StatusCodes = require('../config/statusCodes.config')

const { server } = require('../config/index.config')

const { sendMail } = require('../mailer')

const generateNumber = require('../utils/generateNumber')
const compareTimestamps = require('../utils/compareTimestamps')
const generateHash = require('../utils/generateHash')
const generatePasswordRecoveryEmail = require('../utils/generatePasswordRecoveryEmail')

const sequelize = require('../sequelize')
const UserModel = sequelize.models.user
const RecoveryCode = sequelize.models.recovery_code

module.exports.sendRecoveryPasswordCode = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(StatusCodes[MISSING_PARAMETERS]).send({
            message: MISSING_PARAMETERS,
        })
    }
    if (!email.endsWith('pwr.edu.pl')) {
        return res.status(StatusCodes[WRONG_EMAIL_SYNTAX]).send({
            message: WRONG_EMAIL_SYNTAX,
        })
    }

    const user = await UserModel.findOne({
        where: {
            email,
        },
    })
    if (!user || user.account_status === 'inactive') {
        return res.status(StatusCodes[USER_NOT_FOUND]).send({
            message: USER_NOT_FOUND,
        })
    }

    const hashedCodeFromDb = await RecoveryCode.findOne({
        where: {
            userId: user.id,
        },
    })
    const code = generateNumber(1000, 9000).toString()
    if (!hashedCodeFromDb) {
        generateHash(
            code,
            Number(server.activationCodeHashRounds),
            async (hash) => {
                try {
                    await RecoveryCode.create({
                        userId: user.id,
                        code: hash,
                    })
                    sendMail(
                        'notawril@gmail.com',
                        'TQAS - Recover your password',
                        generatePasswordRecoveryEmail(
                            `${user.first_name} ${user.last_name}`,
                            code
                        )
                    )
                } catch (err) {
                    return res
                        .status(StatusCodes[CODE_HASHING_ERROR])
                        .send({ msg: CODE_HASHING_ERROR })
                }
                return res
                    .status(StatusCodes[RECOVERY_CODE_SEND])
                    .send({ msg: RECOVERY_CODE_SEND, email, hash })
            },
            (err) => {
                console.log(err)
                return res
                    .status(StatusCodes[CODE_HASHING_ERROR])
                    .send({ msg: CODE_HASHING_ERROR })
            }
        )
    } else if (
        hashedCodeFromDb &&
        compareTimestamps(
            Date.now(),
            hashedCodeFromDb.updatedAt,
            15 * 60 * 1000
        ) &&
        hashedCodeFromDb.attempts_number <= 3 &&
        hashedCodeFromDb.is_used === false
    ) {
        return res.status(StatusCodes[RECOVERY_CODE_SEND]).send({
            msg: RECOVERY_CODE_SEND,
            email,
            hash: hashedCodeFromDb.code,
        })
    } else if (
        hashedCodeFromDb &&
        compareTimestamps(
            Date.now(),
            hashedCodeFromDb.updatedAt,
            15 * 60 * 1000
        ) &&
        (hashedCodeFromDb.attempts_number > 3 ||
            hashedCodeFromDb.is_used === true)
    ) {
        return res.status(StatusCodes[RECOVERY_CODE_BLOCKED]).send({
            msg: RECOVERY_CODE_BLOCKED,
        })
    } else if (
        hashedCodeFromDb &&
        !compareTimestamps(
            Date.now(),
            hashedCodeFromDb.updatedAt,
            15 * 60 * 1000
        )
    ) {
        generateHash(
            code,
            Number(server.activationCodeHashRounds),
            async (hash) => {
                try {
                    hashedCodeFromDb.attempts_number = 1
                    hashedCodeFromDb.is_used = false
                    hashedCodeFromDb.code = hash
                    await hashedCodeFromDb.save()
                    sendMail(
                        'notawril@gmail.com',
                        'TQAS - Recover your password',
                        generatePasswordRecoveryEmail(
                            `${user.first_name} ${user.last_name}`,
                            code
                        )
                    )
                } catch (err) {
                    return res
                        .status(StatusCodes[CODE_HASHING_ERROR])
                        .send({ msg: CODE_HASHING_ERROR })
                }
                return res
                    .status(StatusCodes[RECOVERY_CODE_SEND])
                    .send({ msg: RECOVERY_CODE_SEND, email, hash })
            },
            () => {
                return res
                    .status(StatusCodes[CODE_HASHING_ERROR])
                    .send({ msg: CODE_HASHING_ERROR })
            }
        )
    } else {
        return res.status(StatusCodes[RECOVERY_CODE_BLOCKED]).send({
            msg: RECOVERY_CODE_BLOCKED,
        })
    }
}

module.exports.verifyRecoveryCode = async (req, res) => {
    const { email, code } = req.body
    if (!email || !code) {
        return res.status(StatusCodes[MISSING_PARAMETERS]).send({
            message: MISSING_PARAMETERS,
        })
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
    const hash = await RecoveryCode.findOne({
        where: {
            userId: user.id,
        },
    })
    if (
        hash &&
        !hash.is_used &&
        compareTimestamps(Date.now(), hash.updatedAt, 15 * 60 * 1000)
    ) {
        if (!(await bcrypt.compare(code, hash.code))) {
            hash.attempts_number += 1
            await hash.save()

            if (hash.attempts_number > 3) {
                return res
                    .status(StatusCodes[RECOVERY_CODE_BLOCKED])
                    .send({ msg: RECOVERY_CODE_BLOCKED })
            }
            return res
                .status(StatusCodes[WRONG_RECOVERY_CODE])
                .send({ msg: WRONG_RECOVERY_CODE })
        }
        hash.is_used = true
        await hash.save()
        return res.send({ msg: 'Code verified' })
    }
    return res.status(StatusCodes[RECOVERY_CODE_NOT_FOUND]).send({
        msg: RECOVERY_CODE_NOT_FOUND,
    })
}

module.exports.setNewPassword = async (req, res) => {
    const { email, password, code } = req.body
    if (!code) {
        return res.status(StatusCodes[MISSING_PARAMETERS]).send({
            message: MISSING_PARAMETERS,
        })
    }
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
    const hash = await RecoveryCode.findOne({
        where: {
            userId: user.id,
        },
    })
    if (!(await bcrypt.compare(code, hash.code))) {
        return res
            .status(StatusCodes[WRONG_RECOVERY_CODE])
            .send({ msg: WRONG_RECOVERY_CODE })
    }
    generateHash(
        password,
        Number(server.activationCodeHashRounds),
        async (passwordHash) => {
            user.password = passwordHash
            await user.save()
            return res.status(StatusCodes[PASSWORD_CHANGED]).send({
                msg: PASSWORD_CHANGED,
            })
        },
        () => {
            return res
                .status(StatusCodes[PASSWORD_HASHING_ERROR])
                .send({ msg: PASSWORD_HASHING_ERROR })
        }
    )
}
