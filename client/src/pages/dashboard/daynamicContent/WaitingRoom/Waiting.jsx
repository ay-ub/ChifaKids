import { SectionTitle, SearchInput, Table } from "components";
import { useEffect, useState } from "react";
import { useAuth } from "hooks";
import { mapPatients } from "./waitingFun";
import { tableHeader } from "data";
import { getPatients } from "utils";
import { useSocket } from "hooks";

function Waiting() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { socket, setNotificationCounter } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("newPatient", (newPatient) => {
        console.log("newPatient", newPatient);
        setPatients((prev) => [...prev, newPatient]);
      });
    }
    return () => {
      if (socket) {
        socket.off("newPatient");
      }
    };
  }, [socket]);

  // get all patients in first render
  useEffect(() => {
    getPatients(setPatients);
    setNotificationCounter(0);
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
