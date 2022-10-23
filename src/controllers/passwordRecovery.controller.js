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
    },
} = require('../config/index.config')
const StatusCodes = require('../config/statusCodes.config')
const { activationCodeHashRounds } = require('../config/index.config')

const generateNumber = require('../utils/generateNumber')
const compareTimestamps = require('../utils/compareTimestamps')
const generateHash = require('../utils/generateHash')

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
    if (
        hashedCodeFromDb &&
        compareTimestamps(
            Date.now(),
            hashedCodeFromDb.updatedAt,
            15 * 60 * 1000
        )
    ) {
        return res.send({ msg: 'recovery code was already sent' })
    }

    const code = generateNumber(1000, 9999).toString()
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
                await hashedCodeFromDb.save()
                console.log('-----------------------------------')
                console.log(code)
                console.log('-----------------------------------')
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
        generateHash(
            code,
            activationCodeHashRounds,
            async (hash) => {
                await RecoveryCode.create({
                    userId: user.id,
                    code: hash,
                })
                console.log('-----------------------------------')
                console.log(code)
                console.log('-----------------------------------')
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
    if (!(await bcrypt.compare(code, hash.code))) {
        return res
            .status(StatusCodes[WRONG_RECOVERY_CODE])
            .send({ msg: WRONG_RECOVERY_CODE })
    }
    return res.send({ msg: 'Code verified' })
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
        activationCodeHashRounds,
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
