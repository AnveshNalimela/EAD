const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const router = require('./router.js')

const url = 'mongodb://localhost:27017/cbit'
app.use(express.json())
app.use(cors())




mongoose.connect(url)
const conn = mongoose.connection
conn.on('open', () => {
    console.log("Connected with database")
})



const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    isPassed: {
        type: Boolean,
        default: false
    }
})
const Student = mongoose.model("Student", studentSchema)


app.get('/student', async (req, res) => {
    console.log("Get called")
    try {
        const students = await Student.find({})
        return res.json(students)
    } catch (e) {
        console.error("Error while fetching the students", e)
    }
})

app.get(`/student/:id`, async (req, res) => {
    const id = req.params.id
    console.log("Get id called")
    console.log(id)
    try {
        const s = await Student.findById({ _id: id })
        if (s) {
            return res.json(s)
        }
        console.log("No Student found with", id)


    } catch (e) {
        console.error("Error while fetching the student", e)
    }
})

app.delete('/student/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const s = await Student.findByIdAndDelete({ _id: id })
        if (s) {
            return res.json(s)
        }
        console.log("No Student found with", id)

    } catch (e) {
        console.log("Error while deleting the student data")
    }
})



app.post('/student', async (req, res) => {
    console.log(req.body)
    try {
        const newStudent = new Student({
            name: req.body.name,
            rollNo: req.body.rollNo,
            isPassed: req.body.isPassed
        })
        await newStudent.save()
        return res.json(newStudent)
    } catch {
        console.error("Error while creating the student", e)
    }
})


app.patch('/student/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const stu = await Student.findById({ _id: id })
        console.log(stu)
        if (stu) {
            const status = stu.isPassed
            stu.isPassed = !status
            await stu.save()
            return res.json(stu)

        } else
            console.log("Student not found")

    } catch (e) {
        console.log("Error while updating the student data")
    }

})

const port = 3000
app.listen(port, () => {
    console.log("Server is running on port 3000")
})