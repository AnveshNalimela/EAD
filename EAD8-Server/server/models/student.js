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

module.exports = mongoose.model("Student", studentSchema)