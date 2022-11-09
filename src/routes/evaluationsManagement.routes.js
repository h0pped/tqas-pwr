const express = require('express')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()

const {createListOfClasses, setAssessmentSupervisor, createAssessment, getAssessments, getEvaluateesByAssessment } = require('../controllers/evaluationsManagement.controller.js')

router.post('/createListOfClasses', authMiddleware, createListOfClasses)
router.post('/setAssessmentSupervisor', authMiddleware, setAssessmentSupervisor)
router.post('/createAssessment', authMiddleware, createAssessment)
router.get('/getAssessments', authMiddleware, getAssessments)
router.get('/getEvaluateesByAssessment', authMiddleware, getEvaluateesByAssessment)
module.exports = router
