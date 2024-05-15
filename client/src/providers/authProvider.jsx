import { useEffect, useState } from "react";
import { AuthContext } from "context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };
  useEffect(() => {
    const authing = async () => {
      // send get rea to quth api to check if user is logged in
      try {
        const result = await fetch("/api/auth");
        console.log("Result: ", result);
        if (!result.ok) {
          throw new Error("Not logged in");
        }
        const user = await result.json();
        login(user);
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
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
