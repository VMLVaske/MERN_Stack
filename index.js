const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const tweefRouter = require('./routes/tweef-router')

const app = express()
const apiPort = 34576

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', tweefRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
