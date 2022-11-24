const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    evaluateeReviewEvaluation,
    createEvaluationTeams,
    deleteEvaluation,
    getEvaluationsETMemberResponsibleFor,
    removeEvaluationTeamMember,
    getEvaluationByEvaluatee,
} = require('../controllers/evaluationsManagement.controller.js')

const {
    createListOfClasses,
    setAssessmentSupervisor,
    createAssessment,
    getAssessments,
    getEvaluateesByAssessment,
    getAssessmentsBySupervisor,
} = require('../controllers/assessmentManagement.controller')

router.post(
    '/evaluateeReviewEvaluation',
    authMiddleware,
    evaluateeReviewEvaluation
)
router.post('/createEvaluationTeams', authMiddleware, createEvaluationTeams)
router.post('/deleteEvaluation', authMiddleware, deleteEvaluation)
router.get(
    '/getEvaluationsETMemberResponsibleFor',
    authMiddleware,
    getEvaluationsETMemberResponsibleFor
)
router.post(
    '/removeEvaluationTeamMember',
    authMiddleware,
    removeEvaluationTeamMember
)
router.post('/createListOfClasses', authMiddleware, createListOfClasses)
router.post('/setAssessmentSupervisor', authMiddleware, setAssessmentSupervisor)
router.post('/createAssessment', authMiddleware, createAssessment)
router.post(
    '/evaluateeReviewEvaluation',
    authMiddleware,
    evaluateeReviewEvaluation
)
router.post('/createEvaluationTeams', authMiddleware, createEvaluationTeams)
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
router.get(
    '/getEvaluationByEvaluatee',
    authMiddleware,
    getEvaluationByEvaluatee
)

module.exports = router
