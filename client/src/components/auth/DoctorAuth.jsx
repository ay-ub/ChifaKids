import { useAuth } from "hooks";
import { Outlet, Navigate } from "react-router-dom";

function DoctorAuth() {
  const auth = useAuth();
  if (auth.user.typeUser !== "ADMIN" && auth.user.typeUser !== "DOCTOR") {
    return <Navigate to="/dashboard/patietns" />;
  }
  return <Outlet />;
}

export default DoctorAuth;
