const express = require('express')

const authRouter = require('./auth.routes')
const userData = require('./userData.router')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/userData', userData)

module.exports = router
