const nodemailer = require('nodemailer')
const { mailer } = require('../config/mailer.config')
let transporter = nodemailer.createTransport({
    service: mailer.service,
    auth: mailer.auth,
})

module.exports.sendMail = (email, title, content) => {
    const message = {
        to: email,
        subject: title,
        html: content,
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(message, function (err, info) {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        })
    })
}
