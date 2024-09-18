const express = require('express')
const mongoose = require('mongoose')
const Model = require('./models')

const app = express()

app.use((req, res) => {
    res.send('Hello from nodejs')
})

app.listen(5000, async () => {
    console.log('Server stated at http://localhost:5000')
    console.log('Press Ctrl+C to stop')
    await mongoose.connect('mongodb://localhost:27017/mern-vs4')
    console.log('MongoDb connected')

    const users = await Model.User.find()
    console.log('user', users)

    const article = await Model.Article.find()
    console.log('article', article)
})