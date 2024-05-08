import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminProducts from './adminProducts'
import AdminUsers from './adminUsers'
import { useNavigate } from 'react-router-dom'
const Admin = () => {
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab='products' key='1'>
          <AdminProducts />
        </Tabs.TabPane>
        <Tabs.TabPane tab='users' key='2'>
          <AdminUsers />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin