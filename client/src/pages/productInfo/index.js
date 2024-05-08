import { Button, Divider, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCarById } from '../../apiCalls/cars'
import { SetLoader } from '../../redux/loadersSlice'
import moment from 'moment'
import BidForm from './bidForm'
import { getAllBids } from '../../apiCalls/bids'

const ProductInfo = () => {
  const { user } = useSelector((state) => state.users)
  const [showBidForm, setShowBidForm] = useState(false)
  const [car, setCar] = useState(null)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [selectedImageIndex, setselectedImageIndex] = useState(0)

  const getCarsData = async () => {
    try {
      dispatch(SetLoader(true))
      const response = await getCarById(id)
      dispatch(SetLoader(false))
      if (response.success) {
        const bidsResponse = await getAllBids({ car: id })
        setCar({ ...response.data, bids: bidsResponse.data })
      }
      else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    getCarsData()
  }, [])

  return (
    car && <div>

      <div className='grid grid-cols-2 pt-1 gap-5'>

        <div className='flex flex-col gap-2 ml-1'>
          <img className='w-full h-96 object-cover rounded-md ' src={car.images[selectedImageIndex]} />
          <div className='flex gap-5'>
            {car.images.map((img, index) => {
              return (
                <img className={'h-28 w-28 object-cover crusor-pointer rounded-md '
                  + (selectedImageIndex == index ? 'border-2 border-green-600 border-solid p-2' : '')}
                  onClick={() => setselectedImageIndex(index)}
                  src={img}
                />
              )
            })}
          </div>
          <Divider className='my-3 border border-solid border-gray-200' />
          <div>
            <h2 className='text-gray-600'>Added On</h2>
            <span>
              {moment(car.createdAt).format('MMMM D YYYY , hh:mm A')}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-2 '>
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-blue-900'>{car.carName}</h1>
            <span className='text-base '>{car.description}</span>
          </div>
          <Divider className='my-3 border border-solid border-gray-200' />
          <div className='flex flex-col gap-2  '>
            <h1 className='text-blue-900'>Product Details</h1>
            <div className='flex justify-between'>
              <span>Price</span>
              <span>{car.price} DT</span>
            </div>
            <div className='flex justify-between'>
              <span>Model</span>
              <span>{car.model}</span>
            </div>
            <div className='flex justify-between'>
              <span>Purchased At </span>
              <span>{moment().subtract(car.age,'years').format('YYYY')} ({car.age} years ago) </span>
            </div>
            <div className='flex justify-between'>
              <span>Bill Available</span>
              <span>{car.billAvailable ? 'Yes' : 'No'}</span>
            </div>
            <div className='flex justify-between'>
              <span>Warranty Available</span>
              <span>{car.warrantyAvailable ? 'Yes' : 'No' }</span>
            </div>
          </div>
          <Divider className='my-3 border border-solid border-gray-200' />
          <div className='flex flex-col gap-2  '>
            <h1 className='text-blue-900'>Owner Details</h1>
            <div className='flex justify-between'>
              <span>Owner Name</span>
              <span>{car.seller.name}</span>
            </div>
            <div className='flex justify-between'>
              <span>Owner Email</span>
              <span>{car.seller.email}</span>
            </div>
          </div>
          <Divider className='my-3 border border-solid border-gray-200' />
          <div>
            <div className='flex justify-between'>
              <h1 className='text-blue-900'>Bids</h1>
              <Button onClick={() => setShowBidForm(!showBidForm)} className='text-xl'
                disabled={user._id === car.seller._id}  >Place Bid</Button>
            </div>
          </div>
          {car.ShowBidInProductPage && car.bids.map((bid) => {
            return (
              <div className='border border-solid border-gray-400 p-2 mt-1 rounded'>
                <div className='flex justify-between text-gray-700'>
                  <span>Name :</span>
                  <span>{bid.buyer.name}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Price :</span>
                  <span>{bid.bidAmount} DT</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Placed On :</span>
                  <span>{moment(bid.createdAt).format('MMMM D YYYY , hh:mm A')}</span>
                </div>

              </div>
            )
          })}

        </div>

      </div>

      {showBidForm && <BidForm ShowBidForm={showBidForm} setShowBidForm={setShowBidForm} data={getCarsData} car={car} />}
    </div>
  )
}

export default ProductInfo