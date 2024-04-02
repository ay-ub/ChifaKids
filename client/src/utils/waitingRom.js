import { Notify } from "utils";

const getPatients = async (setPatients) => {
  const res = await fetch("http://localhost:3000/patients/isWaiting", {
    method: "GET",
  });
  const data = await res.json();
  if (data.status === "success" && data.data.patient.length > 0) {
    setPatients(data.data.patient);
  } else {
    setPatients([]);
  }
};

const handleWaitingRom = async (patientId, target, setPatients, socket) => {
  try {
    const res = await fetch(
      `http://localhost:3000/patients/${patientId}/${target}`,
      {
        method: "PUT",
      }
    );
    const data = await res.json();
    // console.log("data = ", data);
    if (data.status === "success") {
      if (target === "leaveWaitingRoom") {
        Notify({
          type: "success",
          message: "Supprimer avec succès",
        });
        getPatients(setPatients);
      } else {
        socket.emit("sendNotification", {
          message: "vous avez un patient dans la salle d'attente",
        });
        Notify({
          type: "success",
          message: "ajouter avec succès ",
        });
      }
    } else {
      Notify({
        type: "error",
        message: data.message ? data.message : "opperation has ben error",
      });
    }
  } catch (error) {
    Notify({
      type: "error",
      message: "error dajouter ou salle d'attent .",
    });
  }
};

export { getPatients, handleWaitingRom };
