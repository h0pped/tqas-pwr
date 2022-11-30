const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    createProtocol,
    getProtocol,
    fillProtocol,
} = require('../controllers/protocolManagement.controller.js')

router.post('/createProtocol', authMiddleware, createProtocol)
router.post('/fillProtocol', authMiddleware, fillProtocol)
router.get('/getProtocol', authMiddleware, getProtocol)
module.exports = router
