const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    Tokens: [
        {
            singleToken: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

userSchema.methods.addToken = async function (genToken) {
    try {
        this.Tokens = await this.Tokens.concat({ singleToken: genToken })
        await this.save()
        return this.Tokens
    } catch (error) {
        console.log(error)
    }
}

// userSchema.methods.addUserDetails = async function ({ name, email, phone, tenmark, Twelvemark, address, gender, stream, Aadhar }) {
//     try {
//         this.Application = await this.Application.concat({name, email, phone, tenmark, Twelvemark, address, gender, stream, Aadhar})
//         await this.save()
//         return this.Application
//     } catch (error) {
//         console.log(error)
//     }
// }

const userTable = new mongoose.model("usertable", userSchema)

module.exports = userTable