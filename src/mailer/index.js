const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '245693@student.pwr.edu.pl',
        pass: 'Yus2311nikmet',
    },
})

const message = {
    // from: '245693@student.pwr.edu.pl',
    to: 'notawril@gmail.com',
    subject: 'Subject',
    text: 'Hello SMTP Email',
}
transporter.sendMail(message, function (err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info)
    }
})
