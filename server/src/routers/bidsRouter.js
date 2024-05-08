import express from 'express'
import { authMid } from '../middleware/authMiddleware.js'
import { bidModel } from '../models/bidsModel.js'


const router = express.Router()

// add Bid
router.post("/addBid", authMid, async (req, res) => {
    try {
        const bid = new bidModel(req.body)
        await bid.save()
        res.send({
            success: true,
            message: 'Bid Added Succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post("/getAllBids", authMid, async (req, res) => {
    try {

        const { car, seller, buyer } = req.body
        let filters = {}
        if (seller) {
            filters.seller = seller
        }
        if (car) {
            filters.car = car
        }
        if (buyer) {
            filters.buyer = buyer
        }

        const bids = await bidModel.find(filters).populate('seller').populate('car').populate('buyer')
        res.send({
            success: true,
            data: bids
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})



export { router as bidRouter }