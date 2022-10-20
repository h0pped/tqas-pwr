const express = require('express')
const fileUpload = require('express-fileupload')

const router = express.Router()
router.use(fileUpload())

const {appendUsers} = require('../controllers/uploadUsers.controller.js')

router.post('/appendUsers', appendUsers)

module.exports = router
