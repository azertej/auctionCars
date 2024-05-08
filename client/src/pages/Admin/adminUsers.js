import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { getAllUsers, updateUserStatus } from '../../apiCalls/users'



const AdminUsers = () => {

    const [users, setUsers] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await getAllUsers()
            dispatch(SetLoader(false))
            if (response.success) {
                setUsers(response.data)
            }

        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    const editUserStatus = async (id, status) => {
        try {
            dispatch(SetLoader(true))
            const response = await updateUserStatus(id, status)
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
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'secondName',
            dataIndex: 'secondName'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => {
                return record.role.toUpperCase()
            }
        },
        {
            title: 'Added On',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(record.createdAt).format('DD-MM-YYYY hh-mm A')
            }
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                const { _id, status } = record
                return <div>
                    {status === 'active' && (<span className='underline cursor-pointer'
                        onClick={() => editUserStatus(_id, 'blocked')}  >
                        Block
                    </span>)}
                    {status === 'blocked' && (<span className='underline cursor-pointer'
                        onClick={() => editUserStatus(_id, 'active')}>
                        Unblock
                    </span>)}
                </div>
            }
        }

    ]

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={users} />
        </div>
    )
}

export default AdminUsers