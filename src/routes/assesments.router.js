const express = require('express')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()

const { getAssesments, getEvaluatees } = require('../controllers/assesments.controller')

router.get('/getAssesments', authMiddleware, getAssesments)
router.get('/getEvaluatees', authMiddleware, getEvaluatees)

module.exports = router