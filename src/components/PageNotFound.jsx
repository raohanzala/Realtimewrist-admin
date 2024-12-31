import React from 'react'

const PageNotFound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen px-5 fixed backdrop-blur-md inset-0 bg-gray-100'>
      <h1>The page you are looking for could not be found 😢</h1>
      <button>
          &larr; Go back
        </button>
    </div>
  )
}

export default PageNotFound