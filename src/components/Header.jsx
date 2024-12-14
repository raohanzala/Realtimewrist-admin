import React, { useContext, useState } from 'react'
import { backendUrl } from '../App';
import { FaBell } from "react-icons/fa";
import NotificationsPopup from './NotificationsPopup';
import adminPhoto from '../assets/admin-photo.jpeg';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { IoLogOutOutline } from "react-icons/io5";

import { io } from 'socket.io-client';
import { useEffect } from 'react';


function Header() {
const socket = io(backendUrl)
  const [hasNotification, setHasNotification] = useState([]);
  const [openNotificationPopup, setOpenNotificationPopup] = useState(false)
  const navigate = useNavigate();
  const { pageTitle, logout } = useContext(ShopContext);

  useEffect(() => {
    // Listen for notifications
    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      setHasNotification((prev) => [...prev, data]);
    });

    // Cleanup listener on unmount
    return () => socket.off('notification');
  }, []);

  const handleNotification = () => {
    setOpenNotificationPopup((open) => !open)
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  console.log(hasNotification, 'Notification')

  return (
    <div className="flex w-full items-center justify-between px-5 py-4 bg-white border-b border-gray-200 shadow-md">

      <div className='flex items-center gap-2 text-[#919191]'>
        <div className='cursor-pointer' onClick={() => navigate(-1)}><MdArrowBack /></div>

        <h1 className='text-lg  '>{pageTitle}</h1>
      </div>

      {/* Right Section - Notifications, Profile, and Logout */}
      <div className="flex items-center space-x-4">

        {/* Notification Bell */}

        {/* Admin Profile Section */}
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-gray-300">
            <img
              src={adminPhoto}
              className="w-full h-full object-cover"
              alt="Admin Profile"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold text-gray-800 text-sm">Rao Hanzala</h2>
            <p className="text-xs text-gray-500">CEO & Founder</p>
          </div>
        </div>

        <div className="relative">
          <div
            onClick={handleNotification}
            className="relative p-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <FaBell className="text-xl text-gray-700" />
            {hasNotification.length > 0 && (
              <span
                className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-ping"
              ></span>
            )}
            {hasNotification.length > 0 && (
              <span
                className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"
              ></span>
            )}
          </div>
        </div>
        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
        >
          <IoLogOutOutline className="text-xl ml-[2px]" />
        </div>
      </div>

      {openNotificationPopup && <NotificationsPopup />}
    </div>
  );
}

export default Header;
