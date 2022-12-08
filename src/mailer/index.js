const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'mail.pwr.wroc.pl',
    port: 25,
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports.sendMail = (email, title, content) => {
    const message = {
        to: email,
        from: 'Teaching Quality Assurance System <hospitacje@pwr.edu.pl>',
        subject: title,
        text: content,
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
