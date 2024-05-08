import React, { useEffect, useState } from 'react'
import { GetUser } from '../apiCalls/users'
import { Avatar, Badge, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { SetUser } from '../redux/UsersSlice'
import Notifications from './notifications'
import { getAllNotifications, readNotifications } from '../apiCalls/notifications'



function ProtectedPage({ children }) {
    const [showNotification, setShowNotification] = useState(false)
    const [notifications, setNotifications] = useState([])
    const { user } = useSelector((state) => state.users)
    const navigate = useNavigate()
    const dispatche = useDispatch()

    const validToken = async () => {
        try {
            dispatche(SetLoader(true))
            const response = await GetUser()
            dispatche(SetLoader(false))
            if (response.success) {
                dispatche(SetUser(response.data))
            }
            else {
                navigate("/login")
                message.error(response.message)

            }
        } catch (error) {
            dispatche(SetLoader(false))
            navigate("/login")
            message.error(error.message)

        }

    }

    const getAllNotification = async () => {
        try {
            dispatche(SetLoader(true))
            const response = await getAllNotifications()
            dispatche(SetLoader(false))
            if (response.success) {
                setNotifications(response.data)
            }
            else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatche(SetLoader(false))
            message.error(error.message)
        }
    }

    const readNotification = async () => {
        try {
            const response = await readNotifications()
            if (response.success) {
                getAllNotification()
            }
            else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(message.error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validToken()
            getAllNotification()
        }
        else {
            navigate("/login")
        }
    }, [])


    return (
        user && (
            <div>
                {/*header*/}
                <div className='bg-slate-600 p-5 flex justify-between' >
                    <h2 onClick={() => navigate("/")} className='text-white text-2xl cursor-pointer ' >auctionApp</h2>
                    <div className='bg-white px-5 rounded flex items-center gap-3' >
                        <div className='flex gap-1'>
                            <i className="ri-user-3-line"></i>
                            <span className='underline uppercase cursor-pointer' onClick={
                                () => {
                                    if (user.role === 'admin') {
                                        navigate('/admin')
                                    }
                                    else {
                                        navigate('/profile')
                                    }
                                }
                            }>
                                {user && user.name
                                }</span>
                        </div>
                        <Badge count={notifications.filter((notification) => !notification.readNotification).length}
                            onClick={() => {
                                readNotification()
                                setShowNotification(true)
                            }
                            } className='cursor-pointer'>
                            <Avatar shape='circle' size='small'
                                icon={<i class="ri-notification-3-line"></i>}
                            />
                        </Badge>
                        <i className="ri-logout-box-r-line ml-4 cursor-pointer"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/login")
                            }} ></i>
                    </div>

                </div>
                {/*body*/}
                <div className='px-2' > {children} </div>
                <Notifications showNotifications={showNotification} setShowNotifications={setShowNotification}
                    notifications={notifications} data={setNotifications} />
            </div >
        )
    )
}

export default ProtectedPage
