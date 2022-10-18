const express = require('express')

const authRouter = require('./auth.routes')
const uploadUsersRouter = require('./upload_users.routes')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/upload_users', uploadUsersRouter)

module.exports = router
