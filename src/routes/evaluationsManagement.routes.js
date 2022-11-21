const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    evaluateeReviewEvaluation,
    createEvaluationTeams,
    deleteEvaluation,
    getEvaluationsETMemberResponsibleFor,
    removeEvaluationTeamMember
} = require('../controllers/evaluationsManagement.controller.js')

router.post('/evaluateeReviewEvaluation', authMiddleware, evaluateeReviewEvaluation)
router.post('/createEvaluationTeams', authMiddleware, createEvaluationTeams)
router.post('/deleteEvaluation', authMiddleware, deleteEvaluation)
router.get('/getEvaluationsETMemberResponsibleFor', authMiddleware, getEvaluationsETMemberResponsibleFor)
router.post('/removeEvaluationTeamMember', authMiddleware, removeEvaluationTeamMember)

module.exports = router
