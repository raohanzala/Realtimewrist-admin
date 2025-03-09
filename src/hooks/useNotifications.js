import { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client';
import { backendUrl } from "../App";
import { playSound } from "../helpers";
import { assets } from "../assets/assets";
import { set_notifications } from "../store/slices/notificationSlice";

const useNotifications = (dispatch) => {
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState();
  const [isIncoming, setIsincoming] = useState(true);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(backendUrl);

      socketRef.current.on('notification', (data) => {
        console.log('Notification received:', data);
        console.log('Data notification in ------>', data)
        dispatch(set_notifications(data))
        playSound(assets.notification_sound)
        setIsincoming(true);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('notification');
      }
    };
  }, []);

  const handleRemove = (notificationId) => {
    console.log(notificationId);
    setNotifications((prev) => prev.filter(notification => notification !== notificationId));
    playSound(assets.notification_sound)
  };

  const handleClearAll = () => {
    console.log('clear');
    setNotifications([]);
  };

  return { notifications, handleRemove, handleClearAll, isIncoming, setIsincoming };
};

export default useNotifications;
