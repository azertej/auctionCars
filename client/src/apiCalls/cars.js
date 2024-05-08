import { axiosInstance } from "./axiosInstance";

export const addCar = async (payload) => {
   try {
      const response = await axiosInstance.post('/api-cars/add-car', payload)
      return response.data
   } catch (error) {
      return error.message
   }
}

export const getCars = async (filters) => {
   try {
      const response = await axiosInstance.post('/api-Cars/get-car', filters)
      return response.data
   } catch (error) {
      return error.message
   }
}

export const getCarById = async (id) => {
   try {
      const response = await axiosInstance.get(`/api-cars/getCarByID/${id}`)
      return response.data
   } catch (error) {
      return error.message
   }
}

export const editCar = async (id, payload) => {
   try {
      const response = await axiosInstance.put(`/api-cars/edit-car/${id}`, payload)
      return response.data
   } catch (error) {
      return error.message
   }
}

export const deleteCar = async (id) => {
   try {
      const response = await axiosInstance.delete(`/api-cars/delete-car/${id}`)
      return response.data
   } catch (error) {
      return error.message
   }
}

export const carImages = async (payload) => {
   try {
      const response = await axiosInstance.post('/api-Cars/add-image', payload)
      return response.data
   } catch (error) {
      return error.message
   }
}

export const statusUpdate = async (id, status) => {
   try {
      const response = await axiosInstance.put(`/api-Cars/edit-product-status/${id}`, { status })
      return response.data
   } catch (error) {
      return error.message
   }
}