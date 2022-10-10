require('dotenv').config()

const config = {
    server: {
        port: process.env.PORT || 8080,
    },
}

module.exports = config
