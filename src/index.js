const express = require('express')
const routes = require('./routes')
const { server } = require('./config/index.config')

const app = express()

app.use(express.json())
app.use(routes)

const PORT = server.port

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
