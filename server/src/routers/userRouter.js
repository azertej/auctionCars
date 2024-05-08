import express from 'express'
import { userModel } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authMid } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/register", async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (user) {
            throw new Error("User already Exist")
        }

        const password = req.body.password
        const confirmPassword = req.body.passwordConfiramtion
        if (confirmPassword != password) {
            throw new Error("Incorrect Password")
        }

        if(req.body.termsOfUse != true){
            throw new Error("U have to accept Terms Of Use")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const User = new userModel(req.body)
        await User.save()


        res.send({
            success: true,
            message: "Registration Succesfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post("/login", async (req, res) => {

    try {

        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("User not found")
        }

        if (user.status !== 'active') {
            throw new Error('User Blocked ! Contact the Admin')
        }

        const validConfirmation = await bcrypt.compare(req.body.password, user.password)
        if (!validConfirmation) {
            throw new Error("Invalid Password")
        }

        const token = jwt.sign({ userID: user._id }, process.env.jwt_secret, { expiresIn: '1d' })

        res.send({
            success: true,
            message: "User Login Succesfully",
            data: token
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/current-user", authMid, async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userID)
        res.send({
            success: true,
            message: 'user fetched succesfully',
            data: user
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/getAllUsers", authMid, async (req, res) => {
    try {
        const allUsers = await userModel.find()
        res.send({
            success: true,
            message: 'Users fetched Succesfully',
            data: allUsers
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.put("/editUserStatus/:id", authMid, async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: 'User Updated Succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


export { router as userRouter } 