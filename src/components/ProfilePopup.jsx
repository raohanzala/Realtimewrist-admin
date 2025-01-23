import React, { useEffect } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick';
import { MdOutlineDashboard, MdRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const ProfilePopup = ({setProfilePopup}) => {

  const close = () => setProfilePopup(false);
  const ref = useOutsideClick(close, false);

  const location = useLocation()
  
    useEffect(() => {
      return ()=>  setProfilePopup(false)
    }, [location.pathname, setProfilePopup])

  return (
    <div ref={ref} className="absolute right-2 top-[65px] w-52 overflow-y-scroll  scrollbar-hide bg-white  rounded  z-50 border-gray-200"
       style={{ boxShadow: "rgba(100,100,111, 0.2) 0px 9px 15px 0px" }}
       >
        <ul className='text-sm text-gray-500 cursor-pointer '>
          <Link to={'/profile'}>
          <li className='flex items-center gap-3 px-3 pr-7 py-3 hover:bg-gray-100'><MdRemoveRedEye size={18}/> View Profile</li>
          </Link>
          <Link to={'/edit-profile'}>
          <li className='flex items-center gap-3 px-3 pr-7 py-3 hover:bg-gray-100'><FaRegEdit size={16} /> Edit Profile</li>
          </Link>
          <Link to={'/'}>
          <li className='flex items-center gap-3 px-3 pr-7 py-3 hover:bg-gray-100 '><MdOutlineDashboard size={18}/> Dashboard</li>
          </Link>
        </ul>
       </div>
  )
}

export default ProfilePopup