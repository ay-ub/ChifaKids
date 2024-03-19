import {
  AiOutlineDelete,
  FaUserEdit,
  FaStethoscope,
  FaUserClock,
} from "assets/icon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Notify } from "utils";
import { Alert } from "components";

const getPatients = async (setPatients) => {
  const res = await fetch("http://localhost:3000/patients", { method: "GET" });
  const data = await res.json();
  if (data.status === "success" && data.data.patient.length > 0) {
    setPatients(data.data.patient);
  } else {
    setPatients([]);
  }
};

const handleDelete = async (id, patients, setPatients) => {
  // delete patient
  try {
    const res = await fetch(`http://localhost:3000/patients/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "success") {
      Notify({ type: "success", message: "Le patient a été supprimé." });
      const newPatients = patients.filter((patient) => patient.id !== id);
      setPatients(newPatients);
    } else {
      Notify({ type: "error", message: "Impossible de supprimer le patient." });
    }
  } catch (error) {
    Notify({
      type: "error",
      message: "Impossible de supprimer le patient.",
    });
  }
};

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
    age--;
  return age;
};

const mapPatients = (patients, search, setPatients, user) => {
  return patients
    .filter(
      (patient) =>
        search === "" ||
        patient.firstName.toLowerCase().includes(search.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(search.toLowerCase()) ||
        patient.numberPhone.toLowerCase().includes(search.toLowerCase()) ||
        patient.gender.toLowerCase().includes(search.toLowerCase()) ||
        patient.dateOfBirth.toLowerCase().includes(search.toLowerCase()) ||
        patient.parent.toLowerCase().includes(search.toLowerCase())
    )
    .map((patient, index) => {
      return (
        <motion.tr
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.3 })}
          className="cursor-pointer "
          key={patient.id}
        >
          <td className="select-none">{index + 1}</td>
          <td className="select-none">{patient.firstName}</td>
          <td className="select-none">{patient.lastName}</td>
          <td className="select-none">{patient.gender}</td>
          <td className="select-none">{patient.dateOfBirth}</td>
          <td className="select-none">{calculateAge(patient.dateOfBirth)}</td>
          <td className="select-none">{patient.parent}</td>
          <td className="select-none">{patient.numberPhone}</td>
          <td className="action flex justify-center items-center gap-4">
            {user.typeUser === "ADMIN" || user.typeUser === "DOCTOR" ? (
              <Link
                to={`/dashboard/consultation/${patient.id}`}
                className="select-none"
              >
                <FaStethoscope />
              </Link>
            ) : (
              <span className="select-none">
                <FaUserClock />
              </span>
            )}
            <Link
              to={`/dashboard/edit-patient/${patient.id}`}
              className="select-none"
            >
              <FaUserEdit />
            </Link>
            <Alert
              title="Voulez-vous vraiment supprimer ce patient ?"
              btnFun={() => {
                handleDelete(patient.id, patients, setPatients);
              }}
              description="Cette action ne peut pas être annulée. "
              confirmBtn="Oui, Supprimer"
            >
              <span className="text-red-400 select-none">
                <AiOutlineDelete />
              </span>
            </Alert>
          </td>
        </motion.tr>
      );
    });
};

export { getPatients, mapPatients };
