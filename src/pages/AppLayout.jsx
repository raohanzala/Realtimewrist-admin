import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function AppLayout({ children }) {

  const [isOnline, setIsOnline] = useState(navigator.onLine);
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
          className={`text-white text-sm w-full flex justify-center transition-opacity duration-500 ${
            isOnline ? 'bg-green-500 opacity-100' : 'bg-red-500 opacity-100'
          }`}
          style={{
            opacity: showIndicator ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {isOnline ? 'Back online' : 'You are currently offline, please wait for internet'}
        </p>
      )}
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="flex flex-col w-full h-full">
        <Header />
        <div className=" max-w-screen-2xl w-full mx-auto overflow-y-auto scrollbar-hide bg-[#f9fafb] py-8 px-8">
          {children}
        </div>
      </main>
    </div>
    </div>
  );
}

export default AppLayout;
