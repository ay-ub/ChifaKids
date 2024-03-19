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
} from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import { RequireAuth, DoctorAuth, AdminAuth } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to={"patietns"} />} />
        <Route path="patietns" element={<AllPatients />} />
        <Route path="new-patient" element={<NewPatient />} />
        <Route path="edit-patient/:id" element={<EditPatient />} />
        <Route path="waiting" element={<Waiting />} />
        <Route
          path="consultation/:id"
          element={
            <DoctorAuth>
              <Consultation />
            </DoctorAuth>
          }
        />
        <Route path="payments" element={<Payments />} />
        <Route
          path="medicament"
          element={
            <DoctorAuth>
              <Medicament />
            </DoctorAuth>
          }
        />
        <Route
          path="new-medicament"
          element={
            <DoctorAuth>
              <NewMedicament />
            </DoctorAuth>
          }
        />
        <Route
          path="Edit-medicament/:id"
          element={
            <DoctorAuth>
              <EditMedicament />
            </DoctorAuth>
          }
        />
        <Route
          path="statistics"
          element={
            <AdminAuth>
              <Statistics />
            </AdminAuth>
          }
        />
        <Route
          path="Settings"
          element={
            <AdminAuth>
              <Settings />
            </AdminAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
