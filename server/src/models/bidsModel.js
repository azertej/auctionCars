import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema(
    {
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carsModel',
            required: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usersModel',
            required: true
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usersModel',
            required: true
        },
        bidAmount: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const bidModel = mongoose.model("bidModel", bidSchema)