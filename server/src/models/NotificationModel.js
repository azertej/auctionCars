import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        onClick: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usersModel'
        },
        readNotification: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }

)

export const notificationModel = mongoose.model('notificationsModel', notificationSchema)

