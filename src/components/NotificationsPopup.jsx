import React, { useEffect } from "react";
import { formatTimestamp, formatTimeAgo } from "../helpers";
import { FaBellSlash } from "react-icons/fa6";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Link } from "react-router-dom";

const NotificationsPopup = ({ setNotificationPopup, notifications, handleClearAll, handleRemove }) => {
  
  console.log("NOTIFYPOPUP", notifications);

  const close = () => setNotificationPopup(false);

  const ref = useOutsideClick(close, false)

  useEffect(() => {
    const interval = setInterval(() => {
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div
      className="absolute right-20 top-[74px] w-80 overflow-y-scroll h-[22rem] scrollbar-hide bg-white shadow-lg rounded-lg  z-50 border-gray-200"
      style={{ boxShadow: "rgba(100,100,111, 0.2) 0px 7px 29px 0px" }}
      ref={ref}
      onClick={(e)=> e.stopPropagation()}
    >
          <div className="flex justify-between items-center px-5 py-3 border-b ">
            <h3 className="text-lg text-[#333] ">Notifications</h3>
            {notifications.length > 0 && <p onClick={handleClearAll} className="text-sm text-[#333] hover:opacity-95 cursor-pointer opacity-65 ">
              Clear all{" "}
            </p>}
          </div>
      {notifications.length > 0 ? (
        <>
          <ul>
            {notifications.map((notification, index) => (

              <Link to={`order/${notification?.fullDocument?._id}`}
                key={notification?._id || index}
                className="flex items-center gap-3 duration-1000 justify-between p-5 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 mb-4 rounded-full bg-green-300"></div>
                  <div className="leading-none">
                    <h3 className="text-gray-800 text-sm">
                      {`${
                        notification?.fullDocument?.address?.name ||
                        "Rao Hanzala"
                      } order's ${
                        notification?.fullDocument?.items?.length || 80
                      } watch`}{" "}
                    </h3>
                    <span className="text-xs text-gray-500 ">
                      {formatTimeAgo(
                        notification?.fullDocument?.date
                      )}
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => handleRemove(notification)}
                  className="text-2xl text-[gray] font-extralight hover:text-dark-1 cursor-pointer"
                >
                  &times;
                </div>
              </Link>
            ))}
          </ul>
          {notifications.length === 0 && (
            <button className="pb-4 w-full mt-auto text-sm px-5 text-primary-2 hover:underline">
              View All Notifications
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-5 h-[18rem] text-center">
          <span className="text-3xl text-gray-50 bg-primary-1 opacity-60 rounded-full p-3 mb-2">
            <FaBellSlash />
          </span>
          <p className="text-[#333] mb-2">No new notifications</p>
          <p className="text-xs text-[#6a6a6a]">
            We'll notify you about important updates in{" "}
            <span className="text-nowrap">
              Realtime Wrist.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopup;
