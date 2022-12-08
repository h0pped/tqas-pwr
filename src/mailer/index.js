const nodemailer = require('nodemailer')
//const { mailer } = require('../config/mailer.config')
const transporter = nodemailer.createTransport({
    host: 'mail.pwr.wroc.pl',
    port: 25,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});

module.exports.sendMail = (email, title, content) => {
    const message = {
        to: email,
        from: 'tqas@pwr.edu.pl',
        subject: title,
        text: content,
        //html: '1010101',
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
