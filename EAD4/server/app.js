const express = require('express')
const router = require('./routes/students')
const mongoose = require('mongoose')
const app = express()
const url = "mongodb://localhost:27017/cbit"
const cors = require('cors');


mongoose.connect(url)
const conn = mongoose.connection
conn.on('open', () => {
    console.log("connection started")
})
app.use(cors());
app.use(express.json());
app.use('/students', router)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})