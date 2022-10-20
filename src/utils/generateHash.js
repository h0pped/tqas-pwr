const bcrypt = require('bcrypt')

module.exports = async (text, rounds, resolve, reject) => {
    bcrypt.genSalt(rounds, function (err, salt) {
        if (err) {
            return reject(err)
        }
        bcrypt.hash(text, salt, function (err, hash) {
            if (err) {
                return reject(err)
            }
            return resolve(hash)
        })
    })
}
