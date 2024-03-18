import { useAuth } from "hooks";
import { Navigate } from "react-router-dom";

function DoctorAuth({ children }) {
  const auth = useAuth();
  if (auth.user.typeUser !== "ADMIN" && auth.user.typeUser !== "DOCTOR") {
    return <Navigate to="/dashboard/patietns" />;
  }
  return children;
}

export default DoctorAuth;
