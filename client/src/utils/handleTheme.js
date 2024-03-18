const handleTheme = () => {
  const theme = localStorage.getItem("theme");
  const body = document.querySelector("body");
  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
};

export default handleTheme;
