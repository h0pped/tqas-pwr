const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    createProtocol,
    getProtocol,
    getProtocolPDF,
} = require('../controllers/protocolManagement.controller.js')

router.post('/createProtocol', authMiddleware, createProtocol)
router.get('/getProtocol', authMiddleware, getProtocol)
router.get('/getProtocolPDF', authMiddleware, getProtocolPDF)

module.exports = router
