const express = require('express')
const bodyParser = require('body-parser')
const {
    checkAuthMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()
router.use(bodyParser.urlencoded())

const { getMembers, addMember, removeMember } = require('../controllers/wzhzData.controller')

router.get('/getMembers', checkAuthMiddleware, getMembers)
router.post('/addMember', checkAuthMiddleware, addMember)
router.delete('/removeMember', checkAuthMiddleware, removeMember)

module.exports = router