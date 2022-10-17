const express = require('express')
const router = express.Router()

const {
    authMiddleware,
    checkAuthMiddleware,
} = require('../middlewares/auth.middleware')
const { checkAuth, signIn } = require('../controllers/auth.controller')

router.get('/', authMiddleware, checkAuth)
router.post('/signIn', checkAuthMiddleware, signIn)

module.exports = router
