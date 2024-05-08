import { message, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBids } from '../../../apiCalls/bids'
import { SetLoader } from '../../../redux/loadersSlice'


const OwnBids = () => {

    const [bidData, setBidData] = useState([])
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users)
    const getBidData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await getAllBids({ buyer: user._id })
            dispatch(SetLoader(false))
            if (response.success) {
                setBidData(response.data)
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
            title: 'Car',
            dataIndex: 'car',
            render: (text, record) => {
                return record.car.carName
            }
        },
        {
            title: "Car Price",
            dataIndex: "carPrice",
            render: (text, record) => {
                return record.car.price
            }
        },
        {
            title: "Seller",
            dataIndex: "seller",
            render: (text, record) => {
                return record.seller.name
            }
        },
        {
            title: 'Bid Amount',
            dataIndex: 'bidAmount'
        },
        {
            title: 'Bid Date',
            dataIndex: 'action',
            render: (text, record) => {
                return moment(text).format('MMMM D YYYY , hh:mm A')
            }
        },
        {
            title: 'Message',
            dataIndex: 'message'
        },
        {
            title: 'Own Details',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div className='flex flex-col'>
                        <span>Phone : {record.phone}</span>
                        <span>Email : {record.buyer.email}</span>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getBidData()
    }, [])

    return (

        <Table columns={columns} dataSource={bidData} />

    )
}

export default OwnBids