import React from 'react'

const Box = ({children,className}) => {
  return (
    <div className={`bg-white rounded-md border border-[#f3f4f6] p-4 ${className}`} >
      { children}
    </div>
  )
}

export default Box