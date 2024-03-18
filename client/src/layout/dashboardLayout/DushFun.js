const handleTheme = (setTheme) => {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  } else {
    localStorage.setItem("theme", "light");
    setTheme("light");
  }
};

export { handleTheme };
