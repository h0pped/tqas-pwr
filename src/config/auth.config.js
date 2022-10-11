const config = require('./index.config')

module.exports = {
    secret: config.auth.jwtSecretKey,
    expiresIn: config.auth.jwtExpiresIn,
}
