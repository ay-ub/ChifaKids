const handleLogOut = (auth) => {
  auth.logout();
  location.replace("/");
};

export { handleLogOut };
