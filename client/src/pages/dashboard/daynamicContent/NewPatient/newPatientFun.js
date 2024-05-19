import { Notify } from "utils";

const addPatient = async (newPatient) => {
  try {
    const res = await fetch(`/api/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    });
    const data = await res.json();
    if (data.status === "success") {
      Notify({ type: "success", message: "Patient ajouté" });
    } else {
      Notify({ type: "error", message: "Impossible d’ajouter un patient" });
    }
  } catch (error) {
    Notify({ type: "error", message: "Impossible d’ajouter un patient" });
  }
};

export { addPatient };
