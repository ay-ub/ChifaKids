// import { toast } from "react-toastify";

const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};
import { toast } from "sonner";

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
  // return toast(message, {
  //   description: "Sunday, December 03, 2023 at 9:00 AM",
  //   action: {
  //     label: "Undo",
  //     onClick: () => console.log("Undo"),
  //   },
  // });
}

export default Notify;
