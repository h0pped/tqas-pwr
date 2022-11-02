const express = require('express')

const authRouter = require('./auth.routes')
const wzhzDataRouter = require('./wzhzData.routes')
const uploadUsersRouter = require('./uploadUsers.routes')
const userDataRouter = require('./userData.routes')
const evaluateeRouter = require('./evaluatee.routes')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/wzhzData', wzhzDataRouter)
router.use('/uploadUsers', uploadUsersRouter)
router.use('/userData', userDataRouter)
router.use('/evaluatee', evaluateeRouter)

module.exports = router
