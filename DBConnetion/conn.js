const express = require("express")
const mongoose = require("mongoose")

// const DB = 'mongodb+srv://raju23031997:Chhnit1997@cluster0.bcey1mp.mongodb.net/userregistration?retryWrites=true&w=majority'

// const DB = "mongodb+srv://raju23031997:Chhnit@1997@cluster0.zmtok8k.mongodb.net/?retryWrites=true&w=majority"

// mongoose.connect("mongodb://localhost:27017/userApplication")

mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Server Connected to Database")
}).catch((err)=>{
    console.log(err)
})