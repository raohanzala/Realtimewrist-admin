import React from 'react'
import { MdRemoveRedEye } from 'react-icons/md'

const UserPopup = ({handleDeleteClick,handleProfileModal }) => {
  return (
    <div className='absolute top-8 w-32 cursor-pointer rounded -left-28 bg-white' style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
              <ul className='text-xs text-nowrap'>
                <li className='flex items-center gap-1 p-3 hover:bg-gray-100' onClick={()=>handleProfileModal()}><MdRemoveRedEye size={14}/> View details</li>
                <li className='p-3 hover:bg-gray-100' onClick={handleDeleteClick}> Delete user</li>
              </ul>
            </div>
  )
}

export default UserPopup