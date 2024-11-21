const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const {config} = require('dotenv')

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

app.use((error, req, res, next) => {
    res.status(error.status ?? 400)
        .send({
            message: error.message || 'Problem while processing request',
            errors: error.errors,
        })
})

app.listen(process.env.API_PORT, async () => {
    console.log(`Server stated at http://localhost:${process.env.API_PORT}`)
    console.log('Press Ctrl+C to stop')
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDb connected')
})