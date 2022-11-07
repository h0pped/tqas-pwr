const express = require('express')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()

const { getAssesments, getEvaluateesByAssesment } = require('../controllers/assesments.controller')

router.get('/getAssesments', authMiddleware, getAssesments)
router.post('/getEvaluateesByAssesment', authMiddleware, getEvaluateesByAssesment)

module.exports = router