const express = require('express')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()

const { getMembers, addMember, removeMember } = require('../controllers/wzhzData.controller')

router.get('/getMembers', authMiddleware, getMembers)
router.post('/addMember', authMiddleware, addMember)
router.delete('/removeMember',authMiddleware, removeMember)

module.exports = router