const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded()) 

const {getUsers, updateUser, createUser, deleteUser} = require('../controllers/userData.controller')

router.get('/getUsers', getUsers)
router.post('/updateUser', updateUser)
router.post('/createUser', createUser)
router.post('/deleteUser', deleteUser)

module.exports = router