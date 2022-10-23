const express = require('express')

const authRouter = require('./auth.routes')
const wzhzData = require('./wzhzData.router')
const uploadUsersRouter = require('./uploadUsers.routes')
const userData = require('./userData.router')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/wzhzData', wzhzData)
router.use('/uploadUsers', uploadUsersRouter)
router.use('/userData', userData)

module.exports = router