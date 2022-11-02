const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares/auth.middleware')

const { addEvaluatee } = require('../controllers/evaluatee.controller')

router.post('/addEvaluatee', authMiddleware, addEvaluatee)

module.exports = router
