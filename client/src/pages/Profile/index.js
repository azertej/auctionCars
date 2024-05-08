import React from 'react'
import { Tabs } from 'antd'
import Products from './Products'
import OwnBids from './Products/ownBids'
import { useSelector } from 'react-redux'


const Profile = () => {
   const { user } = useSelector((state) => state.users)
   return (
      <div>
         <Tabs defaultActiveKey='1' >
            <Tabs.TabPane tab='Buy / Sell' key='1' >
               <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Bids' key='2'>
               <OwnBids />
            </Tabs.TabPane>
            <Tabs.TabPane tab='General' key='3'>
               <div className='flex flex-col gap-3 border border-solid border-gray-600 p-3 rounded'>
                  <h1 className='text-3xl text-blue-800'>PROFILE INFO</h1>
                  <div className='flex flex-col gao-2'>
                     <span className='text-xl font-bold text-gray-600 underline'>Name : {user.name.toUpperCase()}</span>
                     <span className='text-xl font-bold text-gray-600 underline '>Second Name : {user.secondName.toUpperCase()}</span>
                     <span className='text-xl font-bold text-gray-600 underline '>Email : {user.email}</span>
                  </div>

               </div>
            </Tabs.TabPane>

         </Tabs>
      </div>
   )
}

export default Profile