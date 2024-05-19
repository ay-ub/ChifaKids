import "./App.css";
import {
  AllPatients,
  Consultation,
  DashboardLayout,
  Login,
  Medicament,
  Payments,
  Statistics,
  Waiting,
  NewPatient,
  EditPatient,
  NewMedicament,
  EditMedicament,
  Settings,
  Bilan,
} from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import { DoctorAuth, AdminAuth } from "./components";
// import { ConsultationProvider } from "providers";
import { useAuth } from "hooks";
function App() {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route path="login" element={<Login />} />

      {/* <Route element={<ConsultationProvider />}> */}
      <Route
        path="dashboard"
        element={auth.user ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to={"patietns"} />} />
        <Route path="patietns" element={<AllPatients />} />
        <Route path="new-patient" element={<NewPatient />} />
        <Route path="edit-patient/:id" element={<EditPatient />} />
        <Route path="waiting" element={<Waiting />} />
        <Route path="payments" element={<Payments />} />
        <Route element={<DoctorAuth />}>
          <Route path="bilan" element={<Bilan />} />
          <Route path="consultation/:patientId" element={<Consultation />} />
          <Route path="medicament" element={<Medicament />} />
          <Route path="new-medicament" element={<NewMedicament />} />
          <Route path="Edit-medicament/:id" element={<EditMedicament />} />
        </Route>
        <Route element={<AdminAuth />}>
          <Route path="statistics" element={<Statistics />} />
          <Route path="Settings" element={<Settings />} />
        </Route>
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
