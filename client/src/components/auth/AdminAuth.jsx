import { useAuth } from "hooks";
import { Outlet, Navigate } from "react-router-dom";

function AdminAuth() {
  const auth = useAuth();
  if (auth.user.typeUser !== "ADMIN") {
    return <Navigate to="/dashboard/patietns" />;
  }
  return <Outlet />;
}

export default AdminAuth;
