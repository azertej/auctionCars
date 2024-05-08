import { axiosInstance } from "./axiosInstance";

export const addBid = async (payload) => {
    try {
        const response = await axiosInstance.post("/bid/addBid",payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const getAllBids = async (filters)=>{
    try {
        const response = await axiosInstance.post("/bid/getAllBids",filters)
        return response.data
    } catch (error) {
        return error.message
    }
}