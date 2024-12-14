import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { ShopContext } from '../contexts/ShopContext';
import { backendUrl } from '../App';
import Box from '../components/Box';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { setPageTitle } = useContext(ShopContext);

  useEffect(() => {
    const socket = io(backendUrl || 'http://localhost:3001'); 

    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      
      if (data && data.fullDocument && data.items) {
        setNotifications((prev) => [...prev, data]); 
      }
    });

    setPageTitle('Notifications');

    return () => {
      socket.off('notification');
      socket.disconnect();
    };
  }, [backendUrl, setPageTitle]); 

  useEffect(() => {
    console.log('Updated Notifications in state:', notifications);
  }, [notifications]);

  return (
    <div className='min-h-screen'>
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
            No new notifications yet.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
