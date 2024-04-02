import { AiOutlineDelete, FaStethoscope } from "assets/icon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { handleWaitingRom, calculateAge } from "utils";
import { Alert } from "components";

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
            ) : null}
            <Alert
              title="Voulez-vous vraiment supprimer ce patient from waitin rom ?"
              btnFun={() => {
                handleWaitingRom(patient.id, "leaveWaitingRoom", setPatients);
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

export { mapPatients };
