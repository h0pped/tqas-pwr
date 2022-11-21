const express = require('express')

const authRouter = require('./auth.routes')
const wzhzData = require('./wzhzData.router')
const uploadUsersRouter = require('./uploadUsers.routes')
const userData = require('./userData.router')
const evaluationsManagement = require('./evaluationsManagement.routes')
const assessmentManagement = require('./assessmentManagement.routes')
const protocolManagement = require('./protocolManagement.router.js')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/wzhzData', wzhzData)
router.use('/uploadUsers', uploadUsersRouter)
router.use('/userData', userData)
router.use('/evaluationsManagement', evaluationsManagement)
router.use('/assessmentManagement', assessmentManagement)
router.use('/protocolManagement', protocolManagement)

module.exports = router
