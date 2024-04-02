import { SectionTitle, SearchInput, Table } from "components";
import { useEffect, useState } from "react";
import { useAuth } from "hooks";
import { mapPatients } from "./waitingFun";
import { tableHeader } from "data";
import { getPatients } from "utils";

function Waiting() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  // get all patients in first render
  useEffect(() => {
    getPatients(setPatients);
  }, []);

  // map patients
  const patientList = mapPatients(patients, search, setPatients, user);

  return (
    <div>
      <div className="flex items-center justify-between ">
        <SectionTitle title="Salle D'attente" />
        <div className="flex items-center gap-3">
          {patients.length > 0 && (
            <SearchInput setSearch={setSearch} search={search} />
          )}
        </div>
      </div>
      <Table data={patients} dataList={patientList} headers={tableHeader} />
    </div>
  );
}

export default Waiting;
