import React, { useState } from "react";
import Logo from "./Logo";
import SideBarItem from "./SideBarItem";
import { Link } from "react-router-dom";
import { CgChevronLeft } from "react-icons/cg";

function SideBar() {

  const [isSmall, setIsSmall] = useState(false)

  return (
    <div
      className={`flex flex-col ${isSmall ? 'w-[80px]' : 'w-[265px]'} group relative h-screen transition-all duration-200 bg-dark-2 `}
    >

      {/* <div className=" bg-dark-2 size-6 absolute top-5 text-white rounded cursor-pointer -right-[6px] flex items-center justify-center rotate-45" onClick={() => setIsSmall((prev) => !prev)}>
        <CgChevronLeft size={16} className={` ${isSmall ? 'rotate-[320deg]' : 'rotate-[135deg]'}`} />
      </div> */}
      <div className=" bg-[#6a6a6a] hidden group-hover:flex rounded-full size-6 absolute top-5 text-white cursor-pointer -right-[10px] items-center justify-center" onClick={() => setIsSmall((prev) => !prev)}>
        <CgChevronLeft size={16} className={` ${isSmall ? 'rotate-[180deg]' : ''}`} />
      </div>
      {!isSmall && <div className="md:flex text-xl font-semibold text-white uppercase justify-center w-full p-4 py-5 hidden">
        <Logo />
      </div>}

      <div className={`p-3 ${isSmall ? 'mt-12' : ' mt-6'} overflow-y-scroll scrollbar-hide`}>
        <ul className="flex flex-col gap-3">
          <SideBarItem isSmall={isSmall} />
        </ul>
      </div>
      {!isSmall && <div className="text-[#6a6a6a] p-3 mt-auto">
        <p className="text-center text-xs">
          Copyright {new Date().getFullYear()} @
          <Link to="/" className="hover:text-white  transition-colors duration-200">
            realtimewrist.pk
          </Link>
          - All Rights Reserved.
        </p>
      </div>}
    </div>
  );
}

export default SideBar;
