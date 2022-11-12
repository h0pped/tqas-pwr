const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    createListOfClasses,
    setAssessmentSupervisor,
    createAssessment,
    getAssesments,
    getEvaluateesByAssesment,
} = require('../controllers/evaluationsManagement.controller.js')

router.post('/createListOfClasses', authMiddleware, createListOfClasses)
router.post('/setAssessmentSupervisor', authMiddleware, setAssessmentSupervisor)
router.post('/createAssessment', authMiddleware, createAssessment)
router.get('/getAssessments', authMiddleware, getAssesments)
router.get(
    '/getEvaluateesByAssessment',
    authMiddleware,
    getEvaluateesByAssesment
)

module.exports = router
