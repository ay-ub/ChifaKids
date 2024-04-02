import { useAuth } from "hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
}

export default RequireAuth;
