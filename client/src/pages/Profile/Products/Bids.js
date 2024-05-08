import { Divider, message, Modal, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, UseDispatch } from 'react-redux'
import { getAllBids } from '../../../apiCalls/bids'
import { SetLoader } from '../../../redux/loadersSlice'


const Bids = ({ showBidModal, setShowBidModal, selectredProduct }) => {

    const [bidData, setBidData] = useState([])
    const dispatch = useDispatch()

    const getBidData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await getAllBids({ car: selectredProduct._id })
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
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
                return record.buyer.name
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
            title: 'Contact Details',
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

    useEffect(()=>{
        if(selectredProduct){
            getBidData()
        }
    },[])

    return (
        <Modal
            open={showBidModal} onCancel={() => setShowBidModal(false)} centered width={1000} >
            <h1 className='text-xl text-green-600' >Bids</h1>
            <Divider className='bg-gray-200 my-3' />
            <div className='mb-3'>
                <span className='text-xl font-bold text-gray-600'>Car Name: </span>
                <span className='text-xl font-bold text-gray-600'>{selectredProduct.carName}</span>
            </div>
           <Table columns={columns} dataSource={bidData} />
        </Modal>
    )
}

export default Bids