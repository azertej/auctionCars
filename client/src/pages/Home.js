import { Divider, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCars } from '../apiCalls/cars'
import { SetLoader } from '../redux/loadersSlice'
import { useNavigate } from 'react-router-dom'
import Filters from './Filters'
import moment from 'moment'



const Home = () => {

  const [cars, setCars] = useState([])
  const [filters, setFilters] = useState({
    status: 'approved',
    model: [],
    age: []
  })
  const [showFilter, setShowFilter] = useState(true)
  const dispatch = useDispatch()
  const naviagte = useNavigate()

  const getCarsData = async () => {
    try {
      dispatch(SetLoader(true))
      const response = await getCars(filters)
      dispatch(SetLoader(false))
      if (response.success) {
        setCars(response.data)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message)
    }
  }


  useEffect(() => {
    getCarsData()
  }, [filters])

  return (
    <div className='flex gap-2'>
      {showFilter && <Filters showFilters={showFilter} setShowfilters={setShowFilter} filters={filters} setFilters={setFilters} />}
      <div className=''>
        <div className='mt-2 flex gap-3 items-center'>
          {!showFilter && <i className="ri-equalizer-fill cursor-pointer" onClick={() => setShowFilter(!showFilter)}></i>}
          <input className='border border-solid border-gray-600 p-2 h-[1px}' type='text' placeholder='Search ...' />
        </div>
        <div className={showFilter ? 'grid grid-cols-4 gap-5 pt-2 mt-1' : 'grid grid-cols-5 gap-5 pt-2 mt-1'} >
          {cars.map((car) => {
            return car.status === 'approved' && <div className='border border-gray-400 border-solid rounded flex flex-col gap-2 pb-2 cursor-pointer '
              key={car._id}>

              <img className='w-full h-48 object-cover' alt='' src={car.images[0]} onClick={() => naviagte(`/product/${car._id}`)} />
              <div className='flex flex-col gap-2 px-3'>
                <h1 className='text-2xl text-gray-700 font-bold '>{car.carName}</h1>
                <p className='text-2sm h-6'>{car.age} {car.age == 1 ? "year" : "years"} old</p>
                <Divider className='my-1' />
                <span className='text-xl font-semibold text-green-700'> {car.price} DT</span>
              </div>

            </div>
          })}
        </div>
      </div>

    </div>

  )
}

export default Home