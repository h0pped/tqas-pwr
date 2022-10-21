const express = require('express')

const authRouter = require('./auth.routes')
const userData = require('./userData.router')
const wzhzData = require('./wzhzData.router')
const uploadUsersRouter = require('./uploadUsers.routes')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/userData', userData)
router.use('/wzhzData', wzhzData)
router.use('/uploadUsers', uploadUsersRouter)

module.exports = router
