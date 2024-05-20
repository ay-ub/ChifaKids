import { useEffect, useState } from "react";
import { SectionTitle, SearchInput, Btn, Table } from "components";
import { writeFile } from "utils";
import { SiMicrosoftexcel } from "assets/icon";
import { Link } from "react-router-dom";
import { FaSackDollar } from "assets/icon";
import { motion } from "framer-motion";
import { ToolTip } from "components";
function PaymenTable() {
  const [patients, setPatients] = useState([]);
  const tableHeader = ["N°", "nom", "prénom", "total", "Status", "action"];

  useEffect(() => {
    const getPatientsData = async () => {
      try {
        const result = await fetch("/api/payment");
        const data = await result.json();
        if (data.status === "success") {
          setPatients(data.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getPatientsData();
  }, []);

  const [search, setSearch] = useState("");
  const patientList = patients
    .filter(
      (patient) =>
        search === "" ||
        patient.firstName.toLowerCase().includes(search.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(search.toLowerCase())
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
          <td className="select-none">{patient?.lastName}</td>
          <td className="select-none">{patient?.firstName}</td>
          <td className="select-none">{patient?.totalReceivedAmount}</td>
          <td className="select-none">status</td>
          <td className="action flex justify-center items-center gap-4">
            <ToolTip
              trigger={
                <Link
                  to={`/dashboard/payments/${patient.id}`}
                  className="select-none"
                >
                  <FaSackDollar className="text-2xl" />
                </Link>
              }
              msg="payment"
            />
          </td>
        </motion.tr>
      );
    });

  return (
    <div className="allPatient">
      <div className="flex items-center justify-between ">
        <SectionTitle title="Règlement" />
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
        </div>
      </div>
      <Table data={patients} dataList={patientList} headers={tableHeader} />
    </div>
  );
}

export default PaymenTable;
