import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineFormatListBulleted
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function SideBarItem() {


  const sideBarItems = [
    { name: "dashboard", icon: <MdOutlineDashboard />, route: "/" },
    { name: "list Products", icon: <MdOutlineFormatListBulleted />, route: "/list" },
    { name: "orders", icon: <MdOutlineShoppingCart />, route: "/orders" },
    { name: "users", icon: <CgProfile />, route: "/users" },
  ];


  return (
    <div className="space-y-2">
      {sideBarItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.route}
          className={({ isActive }) =>
            `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-sm w-full capitalize font-medium transition-all duration-200
            ${isActive
              ? "bg-[#4f4f4f] text-primary-1"
              : "text-[#797979] hover:text-[#e4e4e4] "
            }`
          }
        >
          <span className="text-2xl w-fit">
            {item.icon}
          </span>

          <span className="text-base hidden md:inline">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default SideBarItem;
