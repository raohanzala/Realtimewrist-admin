import React from 'react'

const Box = ({children,className}) => {
  return (
    <div className={`bg-white rounded-md shadow p-4 ${className}`} >
      { children}
    </div>
  )
}

export default Box