const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const sequelize = require('./sequelize')

const { server } = require('./config/index.config')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

const PORT = server.port

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
