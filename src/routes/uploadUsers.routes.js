const express = require('express')
const fileUpload = require('express-fileupload')
const {
    authMiddleware,
} = require('../middlewares/auth.middleware')

const router = express.Router()
router.use(fileUpload())

const {appendUsers} = require('../controllers/uploadUsers.controller.js')

router.post('/appendUsers', authMiddleware, appendUsers)

module.exports = router
