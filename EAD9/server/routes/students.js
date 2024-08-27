const express = require('express')
const router = express.Router()

const Student = require('../models/student')


router.get('/', async (req, res) => {
    try {
        const result = await Student.find({})
        res.json(result)
    } catch {
        console.log("error while fetching the data through get request")

    }
})

//Route the post the route
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        rollNo: req.body.rollNo,
        isPassed: req.body.isPassed
    })
    try {
        console.log(student)

        const s = await student.save()
        res.json(s)
    } catch {
        console.log("error while fetching the data through post request")
    }
})

//Route to find student with speciic id
router.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id)
    res.json(student)
})

//Route to update the data
router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    res.json(student)
})

router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        student.isPassed = true
        const s1 = await student.save()
        res.json(sq)
    }
    catch (err) {
        res.send('Error')
    }

})

module.exports = router

