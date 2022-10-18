const express = require('express')

const authRouter = require('./auth.routes')
const uploadUsersRouter = require('./upload_users.routes')
const userData = require('./user_data.router')
const router = express.Router()

router.use('/auth', authRouter)
router.use('/upload_users', uploadUsersRouter)
router.use('/user_data', userData)

module.exports = router
