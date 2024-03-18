import { useAuth } from "hooks";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
