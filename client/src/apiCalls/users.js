import { axiosInstance } from "./axiosInstance";

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/register", payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/login", payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const GetUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/current-user")
        return response.data
    } catch (error) {
        return error.message
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/auth/getAllUsers')
        return response.data
    } catch (error) {
        return error.message
    }
}

export const updateUserStatus = async (id, status) => {
    try {
        const response = await axiosInstance.put(`/auth/editUserStatus/${id}`, { status })
        return response.data
    } catch (error) {
        return error.message
    }
}