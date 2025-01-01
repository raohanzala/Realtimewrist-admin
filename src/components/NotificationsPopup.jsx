import React from 'react';
import { MdOutlineNotificationsOff } from "react-icons/md";
import { formatTimestamp } from '../helpers';



const NotificationsPopup = ({notifications}) => {

  console.log('NOTIFYPOPUP', notifications)



  return (
    <div className="absolute right-4 top-16 w-72 bg-white shadow-lg rounded-lg p-4 py-5 z-50 border border-gray-200">
      {notifications.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold mb-3 text-[#333]">Notifications</h3>
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className="flex flex-col items-start space-x-3 bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition"
              >
                <span className="text-gray-800">{`${notification.fullDocument.address.name} order's ${notification.fullDocument.items.length} watch`} </span>
                <span className="text-xs text-gray-500 ">{formatTimestamp(notification.fullDocument.date)}</span>
              </li>
            ))}
          </ul>
          {/* <button className="mt-4 text-sm font-semibold text-blue-500 hover:underline">
            View All Notifications
          </button> */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <span className="text-3xl text-gray-50 bg-[#f3e9c1] rounded-full p-3 mb-2"><MdOutlineNotificationsOff/>
          </span>
          <p className="text-[#333] mb-2">No new notifications</p>
          <p className='text-xs text-[#6a6a6a]'>We'll notify you about important updates in Realtime Wrist.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopup;
