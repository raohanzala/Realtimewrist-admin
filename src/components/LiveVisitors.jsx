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

  return <Box>
    <div className="text-lg">👥 Online Visitors: {liveVisitors}</div>
  </Box>
};

export default LiveVisitors;
