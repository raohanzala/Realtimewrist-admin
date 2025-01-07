import { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client';
import { backendUrl } from "../App";

const useNotifications = () => {
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [isIncoming, setIsincoming] = useState(true);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(backendUrl);

      socketRef.current.on('notification', (data) => {
        console.log('Notification received:', data);
        setNotifications((prev) => [...prev, data]);
        setIsincoming(true);
      });
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off('notification');
      }
    };
  }, []);

  const handleRemove = (notificationId) => {
    console.log(notificationId);
    setNotifications((prev) => prev.filter(notification => notification !== notificationId));
  };

  const handleClearAll = () => {
    console.log('clear');
    setNotifications([]);
  };

  return { notifications, handleRemove, handleClearAll, isIncoming, setIsincoming };
};

export default useNotifications;
