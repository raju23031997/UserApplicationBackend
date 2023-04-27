const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
require("./DBConnetion/conn")
app.use(cors())
const port = process.env.PORT
app.use(express.json())
app.use(require("./routes/httpRoutes"))

app.listen(port, ()=>{
    console.log(`Server running on port No. ${port}`)
})