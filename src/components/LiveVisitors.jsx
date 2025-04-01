import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "./Box";

const socket = io(import.meta.env.VITE_BACKEND_URL); // Connect to backend

const LiveVisitors = () => {
  const [liveVisitors, setLiveVisitors] = useState(0);

  useEffect(() => {
    socket.on("liveVisitors", (count) => {
      setLiveVisitors(count);
    });

    return () => {
      socket.off("liveVisitors"); // Cleanup on unmount
    };
  }, [])

  return <div className="mb-3 w-full flex items-center justify-end">
    <div>
      <div className=" flex items-center gap-2 ">👥 Online Visitors: <span className="font-bold text-blue-600 text-xl"> {liveVisitors} </span></div>
      {/* <p className="text-xs text-gray-500">Currently active users on the site</p> */}
    </div>
  </div>
};

export default LiveVisitors;
