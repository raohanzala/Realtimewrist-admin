import React from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick';

const ProfilePopup = ({setProfilePopup}) => {

  const close = () => setProfilePopup(false);
  
    const ref = useOutsideClick(close, false);
  return (
    <div ref={ref} className="absolute right-52 top-[74px] w-28 overflow-y-scroll  scrollbar-hide bg-white  rounded  z-50 border-gray-200"
       style={{ boxShadow: "rgba(100,100,111, 0.2) 0px 9px 15px 0px" }}
       >
        <ul className='text-sm text-gray-500 cursor-pointer '>
          <li className='px-3 py-3 hover:bg-gray-100'>View Profile</li>
          <li className='px-3 py-3 hover:bg-gray-100'>Edit Profile</li>
          <li className='px-3 py-3 hover:bg-gray-100'>Dashboard</li>
        </ul>
       </div>
  )
}

export default ProfilePopup