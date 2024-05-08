import { Form, message, Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, UseDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { deleteNotification } from '../apiCalls/notifications'
import moment from 'moment'
const Notifications = ({ notifications = [], data, showNotifications, setShowNotifications }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteNotifications = async (id) => {
        try {
            dispatch(SetLoader(true))
            const response = await deleteNotification(id)
            dispatch(SetLoader(false))
            if(response.success){
                message.success(response.message)
                data()
            }
            else{
                throw new Error (response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }
    return (
        <div>
            <Modal title='Notifications' open={showNotifications} onCancel={() => setShowNotifications(false)}
                centered width={800} footer={null}>
                <div className='flex flex-col gap-2'>
                    {notifications.map((notification) => {
                        return (
                            <div key={notification._id} className=' border border-solid border-gray-600 p-2 rounded flex justify-between items-center' >
                                <div className='flex flex-col' >
                                    <h1 className='text-lg text-gray-600 cursor-pointer'
                                        onClick={() => {
                                            navigate(notification.onClick)
                                            setShowNotifications(false)
                                        }
                                        } >
                                        {notification.title}</h1>
                                    <span>{notification.message}</span>
                                    <span>{moment(notification.createdAt).fromNow()}</span>
                                </div>
                                <i className="ri-delete-bin-fill cursor-pointer "
                                    onClick={() => {
                                        deleteNotifications(notification._id)
                                    }}
                                ></i>
                            </div>

                        )
                    })}
                </div>
            </Modal>
        </div>
    )
}

export default Notifications