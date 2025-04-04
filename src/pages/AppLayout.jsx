import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { BiX } from "react-icons/bi";

function AppLayout({ children }) {

  const [isOnline, setIsOnline] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="h-screen scrollbar-hide overflow-scroll">
      {showIndicator && (
        <p
          className={`text-white text-sm w-full flex gap-5 justify-between px-10 items-center transition-opacity duration-500 ${isOnline ? 'bg-green-500 opacity-100' : 'bg-red-500 opacity-100'
            }`}
          style={{
            opacity: showIndicator ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <span className="opacity-0">asdf</span>
          {isOnline ? 'Back online' : 'You are currently offline, please wait for internet'}

          <span className="cursor-pointer text-xl flex justify-end justify-items-end" onClick={() => setShowIndicator(false)}><BiX /> </span>
        </p>
      )}
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <main className="flex flex-col w-full h-full">
          <Header />
          <div className=" max-w-screen-2xl w-full mx-auto overflow-y-auto h-full scrollbar-hide bg-[#f9fafb] py-8 px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
