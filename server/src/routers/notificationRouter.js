import express from 'express'
import { authMid } from '../middleware/authMiddleware.js'

import { notificationModel } from '../models/NotificationModel.js'

const router = express.Router()


router.post('/addNotification', authMid, async (req, res) => {
    try {
        const notification = new notificationModel(req.body)
        await notification.save()
        res.send({
            success: true,
            message: 'Notification added Succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get('/getAllNotifications', authMid, async (req, res) => {
    try {
        const notifications = await notificationModel.find({ user: req.body.userID }).sort({ createdAt: -1 })
        res.send({
            success: true,
            data: notifications
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.delete('/deleteNotification/:id', authMid, async (req, res) => {
    try {
        await notificationModel.findOneAndDelete(req.params.id)
        res.send({
            success: true,
            message: 'Notification deleted Succesfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.put('/readNotification', authMid, async (req, res) => {
    try {
        await notificationModel.updateMany(
            { user: req.body.userID, readNotification: false },
            { $set: { readNotification: true } }
        )
        res.send({
            success: true,
            message: 'Notifications has been seen'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})






export { router as notificationRouter }