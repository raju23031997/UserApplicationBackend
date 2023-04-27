const mongoose = require("mongoose")

const userAppSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tenmark: {
        type: String,
        required: true
    },
    Twelvemark: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    Aadhar: {
        type: String,
        required: true
    },
    rID:{
        type: String,
        required: true
    },
    ApplicationID:{
        type:Number
    }
})

module.exports = userApplicationTable = mongoose.model("userApplicationTable", userAppSchema)