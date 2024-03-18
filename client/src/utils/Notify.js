import { toast } from "react-toastify";

const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};

function Notify({ type, message }) {
  toastConfig.theme = localStorage.getItem("theme") || "light";
  switch (type) {
    case "success":
      return toast.success(message, toastConfig);
    case "error":
      return toast.error(message, { ...toastConfig, position: "top-center" });
    case "warning":
      return toast.warning(message, toastConfig);
    default:
      return toast(message, toastConfig);
  }
}

export default Notify;
