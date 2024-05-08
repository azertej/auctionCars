import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllCars, getCars, statusUpdate } from '../../apiCalls/cars'
import { SetLoader } from '../../redux/loadersSlice'


import moment from 'moment'

const AdminProducts = () => {
    const dispatch = useDispatch()
    const [cars, setCars] = useState([])

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await getCars(null)
            dispatch(SetLoader(false))
            if (response.success) {
                setCars(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(SetLoader(true))
            const response = await statusUpdate(id, status)
            dispatch(SetLoader(false))
            if (response.success) {
                message.success(response.message)
                getData()
            }
            else {
                throw new Error(response.message)
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
            title: 'Product',
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
            dataIndex: 'status',
            render: (text, record) => {
                return record.status.toUpperCase()
            }
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
            title: 'Actions',
            dataIndex: 'action',
            render: (text, record) => {
                const { status, _id } = record
                return (
                    <div className='flex gap-3'>
                        {status === 'pending' && (<span className='underline cursor-pointer'
                            onClick={() => onStatusUpdate(_id, 'approved')}>
                            Approve</span>)}
                        {status === 'pending' && (<span className='underline cursor-pointer'
                            onClick={() => onStatusUpdate(_id, 'rejected')}>
                            Reject</span>)}
                        {status === 'approved' && (<span className='underline cursor-pointer'
                            onClick={() => onStatusUpdate(_id, 'blocked')}>
                            Block</span>)}
                        {status === 'blocked' && (<span className='underline cursor-pointer'
                            onClick={() => onStatusUpdate(_id, 'approved')}>
                            Unblock</span>)}
                    </div>

                )
            }
        }

    ]

    useEffect(() => {
        getData()
    }, [])

    return (
        <div >
            <Table columns={columns} dataSource={cars} />
        </div>
    )
}

export default AdminProducts