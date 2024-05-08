import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConfiramtion: {
        type: String,
        required: true
    },
    termsOfUse: {
        type: Boolean,
        default:false,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: String,
        default: "active"
    },
    userPic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model("usersModel", userSchema)