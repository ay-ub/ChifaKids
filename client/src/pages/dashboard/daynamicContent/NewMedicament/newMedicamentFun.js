import { Notify } from "utils";
let medicament = {
  name: "",
  type: "",
  dosage: "",
};

const addMedicament = async (newMedicament) => {
  try {
    const res = await fetch(`/api/medicaments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMedicament),
    });
    const data = await res.json();
    if (data.status === "success") {
      Notify({ type: "success", message: "Le médicament a été ajouté." });
    } else {
      Notify({ type: "error", message: "N’a pas ajouté de médicament." });
    }
  } catch (error) {
    Notify({ type: "error", message: "N’a pas ajouté de médicament." });
  }
};

export { addMedicament, medicament };
