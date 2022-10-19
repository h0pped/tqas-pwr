const express = require('express')

const authRouter = require('./auth.routes')
const userData = require('./user_data.router')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user_data', userData)

module.exports = router
