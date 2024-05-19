import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedicament } from "./editMedicalFun";
import { SectionTitle, MedicamentForm } from "components";

import { Notify } from "utils";

function EditMedicament() {
  const [medicament, setMedicament] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getMedicament(id, setMedicament);
  }, []);

  const updataMedicament = async (medicament) => {
    try {
      const response = await fetch(`/api/medicaments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicament),
      });
      const data = await response.json();
      if (data.status === "success") {
        Notify({ type: "success", message: "medicament Updated ." });
      } else {
        Notify({ type: "error", message: "Failed to update medicament" });
      }
    } catch (error) {
      Notify({ type: "error", message: "Failed to update medicament" });
    }
  };
  return (
    <div>
      <div className="flex flex-col">
        <SectionTitle title="edit Medicament" />
        <div className="flex justify-center">
          {medicament && (
            <MedicamentForm
              medicament={medicament}
              submitFun={updataMedicament}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditMedicament;
