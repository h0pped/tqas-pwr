const express = require('express')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()

const {createListOfClasses, createAssessment} = require('../controllers/evaluationsManagement.controller.js')

router.post('/createListOfClasses', authMiddleware, createListOfClasses)
router.post('/createAssessment', authMiddleware, createAssessment)
module.exports = router
