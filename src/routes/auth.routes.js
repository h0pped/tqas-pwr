const express = require('express')
const router = express.Router()

const {
    authMiddleware,
    checkAuthMiddleware,
} = require('../middlewares/auth.middleware')
const {
    checkAuth,
    signIn,
    sendCode,
    verifyCode,
} = require('../controllers/auth.controller')

router.get('/', authMiddleware, checkAuth)
router.post('/signIn', checkAuthMiddleware, signIn)
router.post('/sendCode', checkAuthMiddleware, sendCode)
router.post('/verifyCode', checkAuthMiddleware, verifyCode)

module.exports = router
