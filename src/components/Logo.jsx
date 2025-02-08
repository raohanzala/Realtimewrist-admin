import React from 'react'
import LogoImg from '../assets/image.png'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className=''>
      <Link to={'/'}>
        <img src={LogoImg} className='w-full h-12' alt="" />
      </Link>
    </div>
  )
}

export default Logo