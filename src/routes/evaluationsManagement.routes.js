const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = express.Router()

const {
    evaluateeReviewEvaluation,
    createEvaluationTeams,
    getEvaluationsETMemberResponsibleFor
} = require('../controllers/evaluationsManagement.controller.js')

router.post('/evaluateeReviewEvaluation', authMiddleware, evaluateeReviewEvaluation)
router.post('/createEvaluationTeams', authMiddleware, createEvaluationTeams)
router.get('/getEvaluationsETMemberResponsibleFor', authMiddleware, getEvaluationsETMemberResponsibleFor)

module.exports = router
