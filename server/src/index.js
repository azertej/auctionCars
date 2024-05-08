import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { userRouter } from './routers/userRouter.js'
import { carsRouter } from './routers/producRouter.js'
import { bidRouter } from './routers/bidsRouter.js'
import { notificationRouter } from './routers/notificationRouter.js'
import path from 'path'
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/auth", userRouter)
app.use("/api-cars", carsRouter)
app.use("/bid", bidRouter)
app.use("/notification", notificationRouter)


mongoose.connect(process.env.mongo_url)
const connect = mongoose.connection
connect.on("connected", () => {
    console.log("mongoDB connected succesfully")
})
connect.on("error", (err) => {
    console.log("mongoDB connection failed")
})

// deployment config

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen("3001", () => console.log("Server is running on POrt 3001")) 