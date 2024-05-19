import { useEffect, useState } from "react";
import { AuthContext } from "context";
import { Loader } from "components";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (user) => {
    setUser(user);
  };
  const logout = async () => {
    try {
      console.log("logout");
      const res = await fetch("/api/auth/logout");
      const isLogout = await res.json();
      if (isLogout.status === "success") {
        setUser(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const authing = async () => {
      // send get rea to quth api to check if user is logged in
      try {
        const result = await fetch("/api/auth");

        if (!result.ok) {
          throw new Error("Not logged in");
        }
        const user = await result.json();
        if (user.status === "success") {
          login(user.data.user);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    authing();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? (
        <div className="LoaderPopUp">
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
