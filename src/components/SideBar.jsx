import React from "react";
import Logo from "./Logo";
import SideBarItem from "./SideBarItem";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="flex flex-col w-[90px] scrollbar-hide md:w-[285px] h-screen overflow-y-scroll transition-all duration-200 bg-[#232323] border-r"
      style={{ boxShadow: "4px 0 8px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="md:flex text-xl font-semibold text-white uppercase justify-center w-full p-4 py-5 hidden">
        <Logo />
      </div>

      <div className="p-3 mt-6">
        <ul className="flex flex-col gap-3">
          <SideBarItem />
        </ul>
      </div>
      <div className="text-[#6a6a6a] py-3 mt-auto">
        <p className="text-center text-xs">
          Copyright 2024 @
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
