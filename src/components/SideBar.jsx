import React from "react";
import Logo from "./Logo";
import SideBarItem from "./SideBarItem";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="flex flex-col w-[90px] md:w-[285px] h-screen transition-all duration-200 bg-dark-2 "
    >
      <div className="md:flex text-xl font-semibold text-white uppercase justify-center w-full p-4 py-5 hidden">
        <Logo />
      </div>

      <div className="p-3 mt-6 overflow-y-scroll scrollbar-hide">
        <ul className="flex flex-col gap-3">
          <SideBarItem />
        </ul>
      </div>
      <div className="text-[#6a6a6a] p-3 mt-auto">
        <p className="text-center text-xs">
          Copyright {new Date().getFullYear()} @
          <Link to="/" className="hover:text-white  transition-colors duration-200">
            realtimewrist.pk
          </Link>
          - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default SideBar;
