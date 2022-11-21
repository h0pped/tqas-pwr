const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    createProtocol
} = require('../controllers/protocolManagement.controller.js')

router.post('/createProtocol', authMiddleware, createProtocol)

module.exports = router
