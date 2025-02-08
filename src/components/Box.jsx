import React from 'react'
import SpinnerMini from './SpinnerMini'

const Box = ({children,className, ...props}) => {
  return (
    <div {...props} className={`bg-white rounded border p-4 ${className}`} >
      {children }
    </div>
  )
}

export default Box