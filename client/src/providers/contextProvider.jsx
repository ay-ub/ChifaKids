import { useState } from "react";
import { globalContext } from "context";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

function ContextProvider({ children }) {
  const [notification, setNotification] = useState([]);

  return (
    <globalContext.Provider value={{ notification, setNotification, socket }}>
      {children}
    </globalContext.Provider>
  );
}

export default ContextProvider;
