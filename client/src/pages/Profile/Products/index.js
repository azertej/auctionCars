import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCar, getCars } from '../../../apiCalls/cars'
import { SetLoader } from '../../../redux/loadersSlice'
import ProductForm from './ProductForm'
import moment from 'moment'
import Bids from './Bids'


const Products = () => {
    const dispatch = useDispatch()
    const [cars, setCars] = useState([])
    const [showProductForm, setShowProductForms] = useState(false)
    const [currentProduct, setcurrentProduct] = useState(null)
    const { user } = useSelector((state) => state.users)
    const [showBidForm, setShowBidForm] = useState(false)

    const deletedCar = async (id) => {
        try {
            dispatch(SetLoader(true))
            const response = await deleteCar(id)
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message)
                getData()
            }
            else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: "Product",
            dataIndex: "images",
            render: (text, record) => {
                return (
                    <img src={record?.images?.length > 0 ? record.images[0] : "" } alt="" 
                        className='w-20 h-20 object-cover rounded-md'
                    />
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'carName'
        },

        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Model',
            dataIndex: 'model'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Added On',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(record.createdAt).format('DD-MM-YYYY hh-mm A')
            }
        }
        ,
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className='flex gap-4 items-center'>
                    <i className="ri-pencil-line cursor-pointer "
                        onClick={() => {
                            setcurrentProduct(record)
                            setShowProductForms(true)
                        }} ></i>
                    <i className="ri-delete-bin-fill cursor-pointer "
                        onClick={() => {
                            deletedCar(record._id)
                        }}
                    ></i>
                    <span className='underline cursor-pointer'
                        onClick={() => {
                            setShowBidForm(true)
                            setcurrentProduct(record)
                        }}>
                        Show Bids</span>
                </div>
            }
        },
    ]

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await getCars(
                { seller: user._id }
            )
            dispatch(SetLoader(false))
            if (response.success) {
                setCars(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])




    return (
        <div >
            <div className='flex justify-end mb-4'>
                <Button
                    onClick={() => {
                        setShowProductForms(true)
                        setcurrentProduct(null)
                    }} >Add Cars</Button>
            </div>

            <Table columns={columns} dataSource={cars} />

            {showProductForm && <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForms} selectedProduct={currentProduct} Data={getData} />}

            {showBidForm && <Bids showBidModal={showBidForm} setShowBidModal={setShowBidForm} selectredProduct={currentProduct} />}

        </div>
    )
}

export default Products