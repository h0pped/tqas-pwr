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
    evaluateeReviewEvaluation,
    createEvaluationTeams,
    getEvaluationsETMemberResponsibleFor
} = require('../controllers/evaluationsManagement.controller.js')

router.post('/createListOfClasses', authMiddleware, createListOfClasses)
router.post('/setAssessmentSupervisor', authMiddleware, setAssessmentSupervisor)
router.post('/createAssessment', authMiddleware, createAssessment)
router.post('/evaluateeReviewEvaluation', authMiddleware, evaluateeReviewEvaluation)
router.post('/createEvaluationTeams', authMiddleware, createEvaluationTeams)
router.get('/getAssessments', authMiddleware, getAssessments)
router.get('/getEvaluateesByAssessment', authMiddleware, getEvaluateesByAssessment)
router.get('/getAssessmentsBySupervisor', authMiddleware, getAssessmentsBySupervisor)
router.get('/getEvaluateesByAssessment', authMiddleware, getEvaluateesByAssessment)
router.get('/getEvaluationsETMemberResponsibleFor', authMiddleware, getEvaluationsETMemberResponsibleFor)

module.exports = router
