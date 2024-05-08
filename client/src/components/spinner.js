import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-10 bg-black opacity-80  '>
        <div className='h-10 w-10 rounded-full border-4 border-solid border-gray-400 border-t-transparent animate-spin '></div>
    </div>
  )
}

export default Spinner