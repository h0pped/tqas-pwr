const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    createListOfClasses,
    setAssessmentSupervisor,
    createAssessment,
    getAssessments,
    getEvaluateesByAssessment,
    getAssessmentsBySupervisor,
    reviewAssessment,
    exportAssessmentSchedule
} = require('../controllers/assessmentManagement.controller.js')

router.post('/createListOfClasses', authMiddleware, createListOfClasses)
router.post('/setAssessmentSupervisor', authMiddleware, setAssessmentSupervisor)
router.post('/createAssessment', authMiddleware, createAssessment)
router.post('/reviewAssessment', authMiddleware, reviewAssessment)
router.get('/getAssessments', authMiddleware, getAssessments)
router.get(
    '/getEvaluateesByAssessment',
    authMiddleware,
    getEvaluateesByAssessment
)
router.get(
    '/getAssessmentsBySupervisor',
    authMiddleware,
    getAssessmentsBySupervisor
)

router.get('/exportAssessmentSchedule', authMiddleware, exportAssessmentSchedule)

module.exports = router
