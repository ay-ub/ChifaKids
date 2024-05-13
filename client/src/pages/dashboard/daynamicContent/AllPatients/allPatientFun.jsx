import {
  AiOutlineDelete,
  FaUserEdit,
  FaStethoscope,
  FaUserClock,
  CiCalendarDate,
} from "assets/icon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Notify, handleWaitingRom, calculateAge } from "utils";
import { Alert, PopUp, ToolTip } from "components";
import RndvForm from "./RndvForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisplayRndv from "./DisplayRndv";

const getPatients = async (setPatients) => {
  const res = await fetch("http://localhost:3000/patients", { method: "GET" });
  const data = await res.json();
  if (data.status === "success" && data.data.patient.length > 0) {
    setPatients(data.data.patient);
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

const mapPatients = (patients, search, setPatients, user, socket) => {
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
          <td className="select-none">{patient.lastName}</td>
          <td className="select-none">{patient.firstName}</td>
          <td className="select-none">{patient.gender}</td>
          <td className="select-none">{patient.dateOfBirth}</td>
          <td className="select-none">
            {calculateAge(new Date(), patient.dateOfBirth)}Mois
          </td>
          <td className="select-none">{patient.parent}</td>
          <td className="select-none">{patient.numberPhone}</td>
          <td className="action flex justify-center items-center gap-4">
            <PopUp
              header={
                <ToolTip
                  trigger={
                    <span className="select-none">
                      <CiCalendarDate />
                    </span>
                  }
                  msg="Rendez-vous"
                />
              }
              body={
                <Tabs defaultValue="Ajouter">
                  <TabsList className="flex">
                    <TabsTrigger value="Ajouter" className="flex-1">
                      Ajouter Rendez-vous
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex-1">
                      historique
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="Ajouter">
                    <RndvForm patientId={patient.id} />
                  </TabsContent>
                  <TabsContent value="password">
                    <DisplayRndv patientId={patient.id} />
                  </TabsContent>
                </Tabs>
              }
            />

            {user.typeUser === "ADMIN" || user.typeUser === "DOCTOR" ? (
              <ToolTip
                trigger={
                  <Link
                    to={`/dashboard/consultation/${patient.id}`}
                    className="select-none"
                  >
                    <FaStethoscope className="mb-2" />
                  </Link>
                }
                msg="Consulter ce patient"
              />
            ) : (
              <ToolTip
                trigger={
                  <span
                    className="select-none"
                    onClick={() => {
                      handleWaitingRom(
                        patient.id,
                        "enterWaitingRoom",
                        setPatients,
                        socket
                      );
                    }}
                  >
                    <FaUserClock />
                  </span>
                }
                msg="ajouter dans la salle d'attente"
              />
            )}
            <ToolTip
              trigger={
                <Link
                  to={`/dashboard/edit-patient/${patient.id}`}
                  className="select-none"
                >
                  <FaUserEdit className="mb-2" />
                </Link>
              }
              msg="Modifier ce patient"
            />
            <Alert
              title="Voulez-vous vraiment supprimer ce patient ?"
              btnFun={() => {
                handleDelete(patient.id, patients, setPatients);
              }}
              description="Cette action ne peut pas être annulée. "
              confirmBtn="Oui, Supprimer"
            >
              <ToolTip
                trigger={
                  <span className="text-red-400 select-none ">
                    <AiOutlineDelete className="text-2xl" />
                  </span>
                }
                msg="Supprimer ce patient"
              />
            </Alert>
          </td>
        </motion.tr>
      );
    });
};

export { getPatients, mapPatients };
