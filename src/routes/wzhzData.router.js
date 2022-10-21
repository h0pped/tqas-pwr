const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded())

const { getMembers, addMember, removeMember } = require('../controllers/wzhzData.controller')

router.get('/getMembers', getMembers)
router.post('/addMember', addMember)
router.delete('/removeMember', removeMember)

module.exports = router