import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

function AdminAuth({ children }) {
  const auth = useAuth();
  if (auth.user.typeUser !== "ADMIN") {
    return <Navigate to="/dashboard/patietns" />;
  }
  return children;
}

export default AdminAuth;
