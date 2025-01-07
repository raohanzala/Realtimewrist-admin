import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineFormatListBulleted,
  MdOutlineStoreMallDirectory,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp
} from "react-icons/md";
import { CgArrowDown, CgArrowsH, CgProfile } from "react-icons/cg";
import { FaBellSlash } from "react-icons/fa6";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { BsArrow90DegRight, BsArrowBarDown, BsArrowDownUp } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";

function SideBarItem() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sideBarItems = [
    { name: "dashboard", icon: <MdOutlineDashboard />, route: "/" },
    { name: "list Products", icon: <MdOutlineFormatListBulleted />, route: "/list" },
    { name: "orders", icon: <MdOutlineShoppingCart />, route: "/orders" },
    { name: "users", icon: <CgProfile />, route: "/users" },
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
    { name: "notifications", icon: <FaBellSlash />, route: "/notifications" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="space-y-2">
      {sideBarItems.map((item, index) => (
        <div key={index} className="w-full">
          <NavLink
            to={item.route ||  '#'}
            className={({ isActive }) =>
              `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-sm w-full capitalize font-medium transition-all duration-200
              ${(isActive && item.route && (!item.route && item.subItems))
                ? "bg-[#4f4f4f] text-primary-1"
                : "text-[#797979] hover:text-[#e4e4e4] "
              }`
            }
            onClick={item.subItems ? toggleDropdown : undefined}
          >
            <span className="text-2xl w-fit">{item.icon}</span>
            <span className="text-base hidden md:inline">{item.name}</span>
            {item.subItems &&  <div className="ml-auto">{!isDropdownOpen ? <IoIosArrowForward />


 : <IoIosArrowDown />

            }</div>}
          </NavLink>
          { item.subItems && isDropdownOpen && (
            <div className="overflow-hidden">
            <div className={`ml-6 mt-2 space-y-2`}>
              {item.subItems.map((subItem, subIndex) => (
                <NavLink
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
              ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideBarItem;
