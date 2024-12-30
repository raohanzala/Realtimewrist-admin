import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

function AppLayout({ children }) {

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <main className="flex flex-col w-full h-full">
        <Header />
        <div className=" overflow-y-auto bg-[#f9fafb] py-8 px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
