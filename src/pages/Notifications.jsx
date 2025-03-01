import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { ShopContext } from '../contexts/ShopContext';
import { backendUrl } from '../App';
import Box from '../components/Box';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { setPageTitle } = useContext(ShopContext);

  // =============TESt SoCKET 
  // const socket = io(process.env.NODE_ENV === 'production' 
  //   ? "https://your-backend-domain.com"  // Deployed backend URL
  //   : "http://localhost:5000",           // Local development URL
  //   {
  //     withCredentials: true,
  //     transports: ['websocket', 'polling'],
  //   }
  // );

  // useEffect(() => {
  //   const = io(process.env.VITE_BACKEND_URL || 'http://localhost:3001'); 

  //   socket.on('notification', (data) => {
  //     console.log('Notification received:', data);
      
  //     if (data && data.fullDocument && data.items) {
  //       setNotifications((prev) => [...prev, data]); 
  //     }
  //   });

  //   setPageTitle('Notifications');

  //   return () => {
  //     socket.off('notification');
  //     socket.disconnect();
  //   };
  // }, [backendUrl, setPageTitle]); 

  useEffect(() => {
    console.log('Updated Notifications in state:', notifications);
  }, [notifications]);

  useEffect(()=> {
    setPageTitle('Notifications')
  }, [])

  return (
    <div className='min-h-screen'>
      <h2 className='mb-5 text-xl text-[#333]'>Today (23)</h2>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <li 
              key={index} 
              className="py-4 px-3 bg-white rounded-sm border mb-2"
            >
              {notif?.fullDocument?.address?.firstName 
                ? `${notif.fullDocument.address.firstName} ordered a ${notif?.items?.[0]?.name || 'product'}`
                : 'A new order was placed'}
            </li>
          ))
        ) : (
          <li className="py-4 px-3 bg-white rounded-sm border">
            No new notifications yets.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
