const express = require('express')
const bodyParser = require('body-parser')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()
router.use(bodyParser.urlencoded()) 

const {getUsers, updateUser, createUser, deleteUser} = require('../controllers/userData.controller')

router.get('/getUsers', authMiddleware, getUsers)
router.post('/updateUser', authMiddleware, updateUser)
router.post('/createUser', authMiddleware, createUser)
router.post('/deleteUser', authMiddleware, deleteUser)

module.exports = router