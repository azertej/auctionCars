import { Button, message, Upload } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { carImages, editCar } from '../../../apiCalls/cars'
import { SetLoader } from '../../../redux/loadersSlice'

const Images = ({ selectedProduct, setShowProductForm, data }) => {

    const dispatch = useDispatch()
    const [File, setFile] = useState(null)
    const [images, setImages] = useState(selectedProduct.images)
    const [showPreview = false, setShowPreview] = useState(true)

    const deleteImage = async (image) => {
        try {
            const updateImage = images.filter((img) => img !== image)
            const updateCar = { ...selectedProduct, images: updateImage }
            const response = await editCar(selectedProduct._id, updateCar)
            if (response.success) {
                message.success(response.message)
                setImages(updateImage)
                setFile(null)
                data()
            }
            else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    const upload = async () => {
        try {
            dispatch(SetLoader(true))
            const formData = new FormData()
            formData.append('file', File)
            formData.append('carID', selectedProduct._id)
            const response = await carImages(formData)
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message)
                data()
                setImages([...images, response.data])
                setShowPreview(false)
                setFile(null)
            }
            else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }
    return (
        <div>
            <div className='flex gap-5 mb-3'>
                {images.map((image) => {
                    return <div className='flex gap-2 border border-solid border-gray-400 rounded p-3 ' >
                        <img className='h-20 w-20 ' src={image} alt='' />
                        <i className="ri-delete-bin-fill cursor-pointer "
                            onClick={() => {
                                deleteImage(image)
                            }}
                        ></i>
                    </div>
                })}
            </div>
            <Upload listType='picture' beforeUpload={() => false} onChange={(info) => {
                setFile(info.file)
                setShowPreview(true)
            }}
                showUploadList={showPreview}
                fileList={File ? [File] : []} >
                <Button>
                    Upload Image
                </Button>
            </Upload>
            <div className='flex justify-end gap-3 mt-2'>
                <Button
                    onClick={() => {
                        setShowProductForm(false)
                    }} >
                    Cancel
                </Button>
                <Button onClick={upload} disabled={!File} >
                    Upload
                </Button>
            </div>

        </div>
    )
}

export default Images