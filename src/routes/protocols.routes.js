const express = require('express')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()

const { getProtocolsByETMember } = require('../controllers/protocols.controller.js')

router.get('/getProtocolsByETMember', authMiddleware, getProtocolsByETMember)
module.exports = router
