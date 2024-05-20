import { PatientForm, SectionTitle } from "components";
import { useState } from "react";
import { addPatient } from "./newPatientFun";

function NewPatient() {
  const [patientData, setPatientData] = useState({
    firstName: "",
    laststName: "",
    gender: "",
    dateOfBirth: "",
    numberPhone: "",
    parent: "",
  });
  return (
    <div>
      <SectionTitle
        title="
      Nouveau Patient
      "
      />
      <div className="flex justify-center">
        <PatientForm patient={patientData} subFun={addPatient} />
      </div>
    </div>
  );
}

export default NewPatient;
