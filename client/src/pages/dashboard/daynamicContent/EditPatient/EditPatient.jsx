import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PatientForm, SectionTitle } from "components";
import { getPatientData } from "./editPatientFun";

import { Notify } from "utils";

function EditPatient() {
  const [patientData, setPatientData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPatientData(id, setPatientData);
  }, []);

  const updatePatient = async (patientData) => {
    console.log(patientData);
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });
      const data = await res.json();
      if (data.status === "success") {
        Notify({ type: "success", message: "Patient mis à jour ." });
      } else {
        Notify({
          type: "error",
          message: "Impossible de mettre à jour le patient .",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible de mettre à jour le patient .",
      });
    }
  };

  return (
    (patientData && (
      <div className="flex flex-col">
        <SectionTitle title="Modifier Patient" />
        <div className="flex justify-center">
          <PatientForm patient={patientData} subFun={updatePatient} />
        </div>
      </div>
    )) || <h1>not fond</h1>
  );
}

export default EditPatient;
