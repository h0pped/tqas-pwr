const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded()) 

const {getUsers, updateUser, createUser, deleteUser} = require('../controllers/user_data.controller')

router.get('/get_users', getUsers)
router.post('/update_user', updateUser)
router.post('/create_user', createUser)
router.post('/delete_user', deleteUser)

module.exports = router