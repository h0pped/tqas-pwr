const express = require('express')
const fileUpload = require('express-fileupload')

const router = express.Router()
router.use(fileUpload())

const {appendUsers} = require('../controllers/upload_users.controller.js')

router.post('/append_users', appendUsers)

module.exports = router
