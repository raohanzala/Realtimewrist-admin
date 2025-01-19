import React from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';

const ProfilePopup = ({setProfilePopup}) => {

  const close = () => setProfilePopup(false);
  
    const ref = useOutsideClick(close, false);
  return (
    <div ref={ref} className="absolute right-52 top-[74px] overflow-y-scroll  scrollbar-hide bg-white  rounded  z-50 border-gray-200"
       style={{ boxShadow: "rgba(100,100,111, 0.2) 0px 9px 15px 0px" }}
       >
        <ul className='text-sm text-gray-500 cursor-pointer '>
          <li className='flex items-center gap-2 px-2 pr-7 py-3 hover:bg-gray-100'><BsEye/> View Profile</li>
          <li className='flex items-center gap-2 px-2 pr-7 py-3 hover:bg-gray-100'><BiPencil size={15}/> Edit Profile</li>
          <li className='flex items-center gap-2 px-2 pr-7 py-3 hover:bg-gray-100 '> <MdOutlineDashboard size={20}/>  Dashboard</li>
        </ul>
       </div>
  )
}

export default ProfilePopup