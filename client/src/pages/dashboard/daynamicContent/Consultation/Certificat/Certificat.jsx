import CertificatMd from "./CertificatV1";
import { Btn, ToolTip } from "components";
import { useAuth } from "hooks";

import { useEffect, useState } from "react";

function Certificat({ patientData }) {
  const auth = useAuth();
  const [nbrJours, setNbrJours] = useState(null);
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const handleEdit = (e, setState) => {
    e.target.contentEditable = false;
    if (e.target.innerText === "" && e.target.innerText.length < 1) {
      setState(null);
    } else {
      setState(e.target.innerText);
    }
  };

  useEffect(() => {
    const addDays = (date, days) => {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    if (dateDebut && nbrJours) {
      setDateFin(
        addDays(new Date(dateDebut), parseInt(nbrJours)).toLocaleDateString()
      );
    }
  }, [dateDebut, nbrJours]);
  return (
    <>
      <CertificatMd
        patientData={patientData}
        nbrJours={nbrJours}
        dateDebut={dateDebut}
        dateFin={dateFin}
      />
      <div className=" flex items-center justify-center h-[400px]">
        <div className="CertificatModel bg-white text-black p-5 rounded-md w-[800px] pb-20">
          <div className="model-content flex flex-col gap-3 pl-6">
            <div className="text-2xl uppercase text-center font-bold italic text-blue-500">
              Certificat medical
            </div>
            <div className=" p-3 text-center my-10">
              je soussigné Dr, {auth.user.lastName} , certifie avoir <br />
              examiné (e) ce jour le (a) sus nomme(é) <br /> et atteste que son
              état de santé nécessite <br /> un arrêt de travail de{" "}
              <ToolTip
                trigger={
                  <span
                    onDoubleClick={(e) => {
                      e.target.contentEditable = true;
                      e.target.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.contentEditable = false;
                        e.target.blur();
                        handleEdit(e, setNbrJours);
                      }
                    }}
                    onBlur={(e) => {
                      e.target.contentEditable = false;
                      handleEdit(e, setNbrJours);
                    }}
                  >
                    {nbrJours || "...................."}
                  </span>
                }
                msg="Nombre de jours"
              />
              jours du{" "}
              <ToolTip
                trigger={
                  <span
                    onDoubleClick={(e) => {
                      e.target.contentEditable = true;
                      e.target.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.contentEditable = false;
                        e.target.blur();
                        handleEdit(e, setDateDebut);
                      }
                    }}
                    onBlur={(e) => {
                      e.target.contentEditable = false;
                      handleEdit(e, setDateDebut);
                    }}
                  >
                    {dateDebut ||
                      "...................." ||
                      new Date().toLocaleDateString()}
                  </span>
                }
                msg="Date de debut"
              />{" "}
              au{" "}
              <ToolTip
                trigger={
                  <span
                    onDoubleClick={(e) => {
                      e.target.contentEditable = true;
                      e.target.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.contentEditable = false;
                        e.target.blur();
                        handleEdit(e, setDateFin);
                      }
                    }}
                    onBlur={(e) => {
                      e.target.contentEditable = false;
                      handleEdit(e, setDateFin);
                    }}
                  >
                    {dateFin || "...................."}
                  </span>
                }
                msg="Date de fin"
              />{" "}
              .
            </div>
          </div>
        </div>
      </div>
      <div className="btnContent flex items-center justify-center">
        <Btn
          text="imprimer"
          btnFun={() => {
            window.print();
          }}
        />
      </div>
    </>
  );
}

export default Certificat;
