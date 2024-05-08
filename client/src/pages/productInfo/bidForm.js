import { Form, Input, message, Modal } from 'antd'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBid } from '../../apiCalls/bids'
import { addNotification } from '../../apiCalls/notifications'
import { SetLoader } from '../../redux/loadersSlice'



const BidForm = ({ ShowBidForm, setShowBidForm, car, data }) => {
    const formRef = useRef(null)
    const rules = [{ required: true, message: 'Required' }]
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users)

    const finish = async (values) => {
        try {
            dispatch(SetLoader(true))
            const response = await addBid({
                ...values,
                seller: car.seller._id,
                car: car._id,
                buyer: user._id
            })
            dispatch(SetLoader(false))
            if (response.success) {
                message.success("Bid Added Succesfully")
                data()
                await addNotification({
                    title: 'New Bid has been placed',
                    message: `A new Bid has been placed on Car ${car.carName} by ${user.name}`,
                    user: car.seller._id,
                    onClick: '/profile',
                    readNotification: false
                })
                setShowBidForm(false)
            }
            else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    return (
        <Modal open={ShowBidForm} onCancel={() => setShowBidForm(false)} centered width={600} onOk={() => formRef.current.submit()} >
            <div className='flex flex-col gap-4'>
                <h1 className='text-gray-500 text-2xl text-center font-semibold '>Bids </h1>
                <Form ref={formRef} onFinish={finish} layout='vertical'>
                    <Form.Item rules={rules} label='Bid Amount' name='bidAmount'>
                        <Input />
                    </Form.Item>
                    <Form.Item rules={rules} label='Message' name='message'>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item rules={rules} label='Phone' name='phone'>
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </div>

        </Modal>
    )
}

export default BidForm