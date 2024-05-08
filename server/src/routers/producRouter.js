import express from 'express'
import { CarsModel } from '../models/productModel.js'
import { authMid } from '../middleware/authMiddleware.js'
import cloudinary from '../config/cloudinary.js'
import multer from 'multer'
import { userModel } from '../models/userModel.js'
import { notificationModel } from '../models/NotificationModel.js'

const router = express.Router()


// add new car
router.post('/add-car', authMid, async (req, res) => {
    try {
        const newCar = new CarsModel(req.body)
        await newCar.save()

        const admins = await userModel.find({ role: "admin" })
        admins.forEach(async (admin) => {
            const notification = new notificationModel({
                user: admin._id,
                title: "New Car",
                message: `new car has been added by ${req.user.name}`,
                onClick: "/admin",
                readNotification: false
            })
            await notification.save()
        })

        res.send({
            success: true,
            message: 'new car added succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// get cars 
router.post('/get-car', async (req, res) => {
    try {
        const { seller, model = [], age = [] } = req.body
        let filters = {}
        if (seller) {
            filters.seller = seller
        }
        if (model.length > 0) {
            filters.model = { $in: model }
        }
        if (age.length > 0) {
            age.forEach(item => {
                const fromAge = item.split('-')[0]
                const toAge = item.split('-')[1]
                filters.age = { $gte: fromAge, $lte: toAge }
            });
        }
        const Cars = await CarsModel.find(filters).populate('seller').sort({ createdAt: -1 })
        res.send({
            success: true,
            data: Cars,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// get car by id

router.get('/getCarByID/:id', async (req, res) => {
    try {
        const car = await CarsModel.findById(req.params.id).populate("seller")
        res.send({
            success: true,
            data: car
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// edit car 
router.put('/edit-car/:id', authMid, async (req, res) => {
    try {
        await CarsModel.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: 'Car edited succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// delete car
router.delete('/delete-car/:id', authMid, async (req, res) => {
    try {
        await CarsModel.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: 'Car deleted succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// to get image form pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})

//upload image to cloudinary
router.post('/add-image', authMid, multer({ storage: storage }).single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "carsPics" })
        const carID = req.body.carID
        await CarsModel.findByIdAndUpdate(carID, {
            $push: { images: result.secure_url }
        })
        res.send({
            success: true,
            message: 'Image added Succesfully',
            data: result.secure_url
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// editStatus

router.put('/edit-product-status/:id', authMid, async (req, res) => {
    try {
        const { status } = req.body
        const currentCar = await CarsModel.findByIdAndUpdate(req.params.id, { status })

        const notification = new notificationModel({
            user: currentCar.seller,
            title: "Car Status Updated",
            message: `Your Car ${currentCar.carName} has been ${status} by admin`,
            onClick: "/profile",
            readNotification: false
        })
        await notification.save()
        res.send({
            success: true,
            message: "Status Updated Succesfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


export { router as carsRouter }