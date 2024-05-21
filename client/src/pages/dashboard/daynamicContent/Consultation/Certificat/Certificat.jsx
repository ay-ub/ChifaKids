import CertificatMd from "./CertificatV1";
import { Btn, DateRangeComponent } from "components";
import { useAuth } from "hooks";
import { Notify } from "utils";

import { useState } from "react";
function Certificat({ patientData }) {
  const auth = useAuth();
  const [selectedDate, setSelectedDate] = useState({ from: "", to: "" });

  return (
    <>
      <CertificatMd patientData={patientData} selectedDate={selectedDate} />
      <div className=" flex items-center justify-center h-[400px]">
        <div className="CertificatModel bg-white text-black p-5 rounded-md w-[800px] pb-20">
          <div className="model-content flex flex-col gap-3 pl-6">
            <div className="text-2xl uppercase text-center font-bold italic text-blue-500">
              Certificat medical
            </div>
            <div className=" p-3 text-center my-10">
              je soussigné Dr, {auth.user.lastName} , certifie avoir <br />
              examiné (e) ce jour le (a) sus nomme(é) <br /> et atteste que son
              état de santé nécessite <br /> un arrêt de travail du{" "}
              <span>{selectedDate.from}</span> {""}
              au <span>{selectedDate.to}</span>.
            </div>
          </div>
        </div>
      </div>
      <div className="btnContent flex items-center justify-center gap-4">
        <DateRangeComponent
          onDateChange={() => {}}
          setSelectedDate={setSelectedDate}
          nbrDays={10}
        />
        <Btn
          text="imprimer"
          btnFun={() => {
            if (selectedDate.from == "" || selectedDate.to == "") {
              Notify({
                type: "error",
                message: "Veuillez sélectionner une date valide",
              });
              return;
            }
            window.print();
          }}
        />
      </div>
    </>
  );
}

export default Certificat;
