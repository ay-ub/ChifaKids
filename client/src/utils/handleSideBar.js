const handleSideBar = () => {
  const sideBar = localStorage.getItem("sideBar");
  // const sideBarEl = document.querySelector(".sideBar");
  if (sideBar === "isHidden") {
    return true;
  } else {
    return false;
  }
};

export default handleSideBar;
