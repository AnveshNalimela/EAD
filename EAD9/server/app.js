const express = require('express')
const router = require('./routes/students')
const mongoose = require('mongoose')
const app = express()
const url = "mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/cbitit1?replicaSet=m101";

mongoose.connect(url)
const conn = mongoose.connection
conn.on('open', () => {
    console.log("connection started")
})

app.use(express.json());
app.use('/students', router)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})