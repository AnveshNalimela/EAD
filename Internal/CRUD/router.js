const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

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
const Student = mongoose.model("Students", studentSchema)

router.get('/', async (req, res) => {
    console.log("Get called")
    try {
        const students = await Student.find({})
        return res.json(students)
    } catch (e) {
        console.error("Error while fetching the students", e)
    }
})

router.get(`/:id`, async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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



router.post('/', async (req, res) => {
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

module.exports = router
