import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider, ThemeProvider, ContextProvider } from "providers";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleTheme } from "utils";

// import { Loader } from "components";
import { Toaster } from "@/components/ui/sonner";

handleTheme();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider>
    <AuthProvider>
      <ContextProvider>
        <BrowserRouter>
          {/* <ToastContainer /> */}
          <Toaster />
          {/* <div className="fixed w-full h-full bg-red-500 z-50 flex items-center justify-center">
          <Loader />
        </div> */}
          <App />
        </BrowserRouter>
      </ContextProvider>
    </AuthProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
