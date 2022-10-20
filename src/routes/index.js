const express = require('express')

const authRouter = require('./auth.routes')
const uploadUsersRouter = require('./uploadUsers.routes')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/uploadUsers', uploadUsersRouter)

module.exports = router
