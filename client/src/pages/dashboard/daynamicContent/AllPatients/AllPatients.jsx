import { useEffect, useState } from "react";
import { SectionTitle, SearchInput, Btn, Table } from "components";
import { getPatients, mapPatients } from "./allPatientFun";
import { writeFile } from "utils";
import { useAuth, useContxt } from "hooks";
import { FaUserPlus, SiMicrosoftexcel } from "assets/icon";

const tableHeader = [
  "N°",
  "nom",
  "prénom",
  "sexe",
  "date de naissance",
  "âge",
  "parent",
  "téléphone",
  "action",
];

function AllPatients() {
  // state for all patients
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { socket } = useContxt();

  // get all patients in first render
  useEffect(() => {
    getPatients(setPatients);
  }, []);

  // map patients
  const patientList = mapPatients(patients, search, setPatients, user, socket);

  return (
    <div className="allPatient">
      <div className="flex items-center justify-between ">
        <SectionTitle title="Patients" />
        <div className="flex items-center gap-3">
          {patients.length > 0 && (
            <SearchInput setSearch={setSearch} search={search} />
          )}
          {patients.length > 0 && (
            <Btn
              btnFun={() => {
                writeFile(patients, "patients");
              }}
              text="Exporter"
              icon={<SiMicrosoftexcel />}
            />
          )}
          <Btn
            path="/dashboard/new-patient"
            text="Ajouter"
            icon={<FaUserPlus />}
          />
        </div>
      </div>
      <Table data={patients} dataList={patientList} headers={tableHeader} />
    </div>
  );
}

export default AllPatients;
