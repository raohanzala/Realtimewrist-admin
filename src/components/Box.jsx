import React from 'react'

const Box = ({children,className, ...props}) => {
  return (
    <div {...props} className={`bg-white rounded-md border p-4 ${className}`} >
      { children}
    </div>
  )
}

export default Box