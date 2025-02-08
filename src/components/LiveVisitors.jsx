import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "./Box";

const socket = io(import.meta.env.VITE_BACKEND_URL); // Connect to backend

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    socket.on("visitorCount", (count) => {
      setVisitors(count); // Update visitor count
    });

    return () => {
      socket.off("visitorCount"); // Cleanup on unmount
    };
  }, []);

  return <Box>
<div className="text-lg">👥 Online Visitors: {visitors}</div>
  </Box> 
};

export default LiveVisitors;
