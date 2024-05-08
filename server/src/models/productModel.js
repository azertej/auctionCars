import mongoose from 'mongoose'

const carstSchema = new mongoose.Schema(
    {
        carName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        images: {
            type: Array,
            default: [],
            required: true
        },
        billAvailable: {
            type: Boolean,
            default: false
        },
        warrantyAvailable: {
            type: Boolean,
            default: false
        },
        ShowBidInProductPage: {
            type: Boolean,
            default: false
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usersModel',
            required: true
        },
        status: {
            type: String,
            default: 'pending',
            required: true
        }
    },
    { timestamps: true }
)


export const CarsModel = mongoose.model("carsModel", carstSchema)