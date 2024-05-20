import { createContext, useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import io from "socket.io-client";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notificationCounter, setNotificationCounter] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.typeUser !== "NURSE") {
      const socket = io("http://localhost:3000");
      setSocket(socket);
      console.log("create Socket");

      socket.on("newNotification", () => {
        setNotificationCounter((_) => _ + 1);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, notificationCounter, setNotificationCounter }}
    >
      {children}
    </SocketContext.Provider>
  );
};
