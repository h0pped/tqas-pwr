const express = require('express')

const authRouter = require('./auth.routes')
const wzhzData = require('./wzhzData.router')
const uploadUsersRouter = require('./uploadUsers.routes')
const userData = require('./userData.router')
const assesmentData = require('./assesments.router')
const createListOfClasses = require('./evaluationsManagement.routes')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/wzhzData', wzhzData)
router.use('/uploadUsers', uploadUsersRouter)
router.use('/userData', userData),
router.use('/assesmentData', assesmentData)
router.use('/evaluationsManagement', createListOfClasses)

module.exports = router