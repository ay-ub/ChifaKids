import { SocketContext } from "context/SocketContext.jsx";
import { useContext } from "react";

const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within an SocketProvider");
  }
  return context;
};

export default useSocket;
