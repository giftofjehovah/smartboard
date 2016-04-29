const express = require('express')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/smartboard'

const app = express()

mongoose.connect(mongoUri)
app.listen(port)

app.get('/', (req, res) => {
  res.send('Hello World')
})
