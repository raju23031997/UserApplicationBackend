const express = require("express")
const router = express.Router()
const userTable = require("../model/userCollection")
const userApplicationTable = require("../model/userApplication")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

//// For send verification mail
const sendVerifyMail = async (name, email, user_id) => {
    try {
        // const testAccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'raju23031997@gmail.com',
                pass: 'ggoupguviqlosocl'
            }
        });

        const info = await transporter.sendMail({
            from: "raju23031997@gmail.com",
            to: email,
            subject: "For Verification Mail",
            html: `<p>Hii ${name} please click here to <a href="http://localhost:3000/verify?id=${user_id}"> Verify</a> Your Mail. </p>`
        })
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

router.post("/signUp", async (req, res) => {
    try {
        const { name, email, phone, password, cpassword } = req.body
        const userEmailCheck = await userTable.findOne({ email })
        const userPhoneCheck = await userTable.findOne({ phone })
        if (userEmailCheck || userPhoneCheck) {
            // res.status(250).json({ msg: "User already used", status: false })
            res.status(202).send("User already used")
        } else if (password != cpassword) {
            // res.status(255).json({ msg: "password and confirm password not matching" })
            res.status(206).send("password and confirm password not matching")
        } else if (!name || !email || !phone || !password || !cpassword) {
            res.status(204).send("All field are required")
        } else {
            const userAPI = new userTable({ name, email, phone, password, cpassword })
            const userAddedData = await userAPI.save()
            // if(userAddedData){
            //     // sendVerifyMail(name, email, userAddedData._id)
            // }
            res.status(200).send(userAddedData)
            console.log(userAddedData)
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/verify", async (req, res) => {
    res.render('email-veryfied')
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmailCheck = await userTable.findOne({ email })

        if (userEmailCheck) {

            const newPassword = await bcrypt.compare(password, userEmailCheck.password)
            console.log(password)
            console.log(newPassword)
            console.log(userEmailCheck)

            // generate Token after validation
            const genToken = jwt.sign({ userEmailCheck }, process.env.SECRET_KEY)
            console.log(genToken)

            // Set userToken into Schema using addToken method which is define into schema file
            const userToken = await userEmailCheck.addToken(genToken)

            // set token in cookie
            res.cookie("jwtCookie", genToken, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 6000000)
            })

            if (userEmailCheck && newPassword) {
                res.status(200).send(userEmailCheck)
            } else {
                res.status(204).send("Invalid Credential")
            }
        } else {
            res.status(204).send("Invalid Credential email")
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post("/RegistrationForm", async (req, res) => {
    try {
        const { name, email, phone, tenmark, Twelvemark, address, gender, stream, rID, Aadhar } = req.body
        const getData = await userApplicationTable.findOne({email})
        if(!name || !email || !phone || !tenmark || !Twelvemark || !address || !gender || !stream || !rID || !Aadhar){
            res.status(204).send("All field are required")
        } else if(!getData){
            let randomNumber = 0;
            let ApplicationID = 0;
            for(let i=0;i<9;i++){
                randomNumber = Math.floor(Math.random() * 10)
                ApplicationID+= randomNumber.toString()
            }
            console.log(ApplicationID)
            const createUserAppAPI = new userApplicationTable({ name, email, phone,ApplicationID, tenmark, rID, Twelvemark, address, gender, stream, Aadhar })
            const addApplicationData = await createUserAppAPI.save()
            res.status(200).send(addApplicationData)
            console.log(addApplicationData)
        } else {
            res.status(202).send("User Already Filled form")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/ApplicationView", async(req, res)=>{
    try {
        const sendData = await userApplicationTable.find()
        res.status(200).send(sendData)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router