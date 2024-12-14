import React, { useState } from "react";
import { backendUrl } from "../App";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineFormatListBulleted
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect } from "react";

import { io } from 'socket.io-client';


function SideBarItem() {
  const socket = io(backendUrl)
  const location = useLocation(); // To track the current route
  const [hasNotifications, setHasNotifications] = useState(true); // Notification state
  const [notifications, setNotifications] = useState([]);

  console.log('Notification', notifications)

  useEffect(() => {
    // Listen for notifications
    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      setNotifications((prev) => [...prev, data]);
    });

    // Cleanup listener on unmount
    return () => socket.off('notification');
  }, []);

  const sideBarItems = [
    { name: "dashboard", icon: <MdOutlineDashboard />, route: "/" },
    { name: "list Products", icon: <MdOutlineFormatListBulleted />, route: "/list" },
    { name: "orders", icon: <MdOutlineShoppingCart />, route: "/orders" },
    { name: "users", icon: <CgProfile />, route: "/users" },
    {
      name: "notifications",
      icon: <IoMdNotificationsOutline />,
      route: "/notifications",
      hasNotification: hasNotifications
    },
  ];

  useEffect(() => {
    if (location.pathname === "/notifications") {
      setHasNotifications(false);
    }
  }, [location.pathname]);

  return (
    <div className="space-y-2">
      {sideBarItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.route}
          className={({ isActive }) =>
            `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-sm w-full capitalize font-medium transition-all duration-200
            ${isActive
              ? "bg-[#4f4f4f] text-primary"
              : "text-[#797979] hover:text-[#e4e4e4] "
            }`
          }
        >
          <span className="text-2xl w-fit relative">
            {item.icon}
            {notifications.length > 0 && item.name === "notifications" && (
              <span className="absolute top-0 right-0 flex justify-center items-center h-2 w-2 rounded-full bg-red-500  text-white"></span>
            )}
          </span>

          <span className="text-base hidden md:inline">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default SideBarItem;
