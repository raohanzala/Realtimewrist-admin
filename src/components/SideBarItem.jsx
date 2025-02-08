import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineFormatListBulleted,
  MdOutlineStoreMallDirectory,
} from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { IoLogoAppleAr, IoSettingsOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";


function SideBarItem() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sideBarItems = [
    { name: "dashboard", icon: <MdOutlineDashboard />, route: "/" },
    { name: "list Products", icon: <MdOutlineFormatListBulleted />, route: "/list" },
    { name: "Categories", icon: <MdCategory />      , route: "/category" },
    { name: "orders", icon: <MdOutlineShoppingCart />, route: "/orders" },
    { name: "users", icon: <LuUsers />, route: "/users" },
    { name: "settings", icon: <IoSettingsOutline />, route: "/settings" },
    {
      name: "online store",
      icon: <MdOutlineStoreMallDirectory />,
      // route : '#',
      subItems: [
        { name: "view store", route: "/online-store/view" },
        { name: "store customization", route: "/online-store/customization" },
        { name: "store settings", route: "/online-store/settings" },
      ]
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="space-y-2">
      {sideBarItems.map((item, index) => (
        <div key={index} className="w-full">
          <NavLink
            to={item.route || '#'}
            className={({ isActive }) =>
              `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-sm w-full capitalize font-medium transition-all duration-200
              ${(isActive && item.route)
                ? "bg-[#4f4f4f] text-primary-1"
                : "text-[#797979] hover:text-[#e4e4e4] "
              }`
            }
            onClick={item.subItems ? toggleDropdown : undefined}
          >
            <span className="text-2xl w-fit">{item.icon}</span>
            <span className="text-base hidden md:inline">{item.name}</span>
            {item.subItems && <div className="ml-auto">{!isDropdownOpen ? <IoIosArrowForward />
              : <IoIosArrowDown />
            }</div>}
          </NavLink>
          {item.subItems && isDropdownOpen && (
            <div className="overflow-hidden">
              <div className={`ml-6 mt-2 space-y-2`}>
                {item.subItems.map((subItem, subIndex) => {
                  return  <NavLink
                    key={subIndex}
                    to={subItem.route}
                    className={({ isActive }) =>
                      `block text-sm px-3 py-2 rounded-sm w-full capitalize font-medium transition-all duration-200
                    ${isActive
                        ? "bg-[#4f4f4f] text-primary-1"
                        : "text-[#797979] hover:text-[#e4e4e4] "
                      }`
                    }
                  >
                    -- {subItem.name}
                  </NavLink>
})}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideBarItem;
