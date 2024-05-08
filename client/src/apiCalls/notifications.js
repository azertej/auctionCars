import { axiosInstance } from "./axiosInstance"


export const addNotification = async(payload)=>{
    try {
        const response = await axiosInstance.post('/notification/addNotification',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const getAllNotifications = async()=>{
    try {
        const response = await axiosInstance.get('/notification/getAllNotifications')
        return response.data
    } catch (error) {
        return error.message
    }
}

export const deleteNotification = async(id)=>{
    try {
        const response = axiosInstance.delete(`/notification/deleteNotification/:${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
}                           

export const readNotifications = async()=>{
    try {
        const response = await axiosInstance.put('/notification/readNotification')
        return response.data
    } catch (error) {
        return error.message
    }
}