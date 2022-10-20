const express = require('express')

const authRouter = require('./auth.routes')
<<<<<<< HEAD
<<<<<<< HEAD
const uploadUsersRouter = require('./uploadUsers.routes')
=======
const userData = require('./user_data.router')
>>>>>>> c24dac2 (CRUD endpoints for users)
=======
const userData = require('./userData.router')
>>>>>>> 5513fa5 (renaming files and endpoints to camelcase)

const router = express.Router()

router.use('/auth', authRouter)
<<<<<<< HEAD
<<<<<<< HEAD
router.use('/uploadUsers', uploadUsersRouter)
=======
router.use('/user_data', userData)
>>>>>>> c24dac2 (CRUD endpoints for users)
=======
router.use('/userData', userData)
>>>>>>> 5513fa5 (renaming files and endpoints to camelcase)

module.exports = router
