const express = require('express')

const authRouter = require('./auth.routes')
const uploadUsersRouter = require('./uploadUsers.routes')

const { sendMail } = require('../mailer')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/uploadUsers', uploadUsersRouter)

router.get('/mail', async (req, res) => {
    try {
        const mailSendingResult = await sendMail(
            'notawril@gmail.com',
            'hello',
            'there'
        )
        res.send(mailSendingResult)
    } catch (err) {
        res.send({ err })
    }
})
module.exports = router
