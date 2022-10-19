const express = require('express')

const authRouter = require('./auth.routes')
<<<<<<< HEAD
const uploadUsersRouter = require('./uploadUsers.routes')
=======
const userData = require('./user_data.router')
>>>>>>> c24dac2 (CRUD endpoints for users)

const router = express.Router()

router.use('/auth', authRouter)
<<<<<<< HEAD
router.use('/uploadUsers', uploadUsersRouter)
=======
router.use('/user_data', userData)
>>>>>>> c24dac2 (CRUD endpoints for users)

module.exports = router
