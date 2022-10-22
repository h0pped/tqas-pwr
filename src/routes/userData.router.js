const express = require('express')
const bodyParser = require('body-parser')
const {
    checkAuthMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()
router.use(bodyParser.urlencoded()) 

const {getUsers, updateUser, createUser, deleteUser} = require('../controllers/userData.controller')

router.get('/getUsers', checkAuthMiddleware, getUsers)
router.post('/updateUser', checkAuthMiddleware, updateUser)
router.post('/createUser', checkAuthMiddleware, createUser)
router.post('/deleteUser', checkAuthMiddleware, deleteUser)

module.exports = router