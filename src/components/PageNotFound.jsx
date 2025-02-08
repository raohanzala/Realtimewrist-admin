import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-5 fixed backdrop-blur-md inset-0 bg-gray-100'>
      <h1>The page you are looking for could not be found 😢</h1>
      <button onClick={()=> navigate(-1)} className='mt-3 text-sm border border-[#333] hover:bg-primary-1 hover:text-white hover:border-primary-1 px-4 py-2'>
          &larr; Go back
        </button>
    </div>
  )
}

export default PageNotFound