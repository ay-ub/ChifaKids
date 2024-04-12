import Entecedent from "./entecedent/Entecedent.jsx";
import ConsultationForm from "./ConsultationForm.jsx";
import Courbes from "./Courbes.jsx";
import { SectionTitle } from "components";
import Motif from "./Motif.jsx";
import { useState, useEffect } from "react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import ExamenClinique from "./examenClinique.jsx";
import Ordonnance from "./ordonnance/Ordonnance.jsx";

function Consultation() {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState();
  const [consultationData, setConsultationData] = useState([]);
  const [consultationId, setConsultationId] = useState();

  //get patient data
  useEffect(() => {
    const getPatientData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/patients/${patientId}`, {
          method: "GET",
        });
        const resData = await res.json();
        if (resData.data.patient) {
          setPatientData(resData.data.patient);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getPatientData();
  }, [patientId]);

  //get consultation of patient
  useEffect(() => {
    const getConsultationData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/consultations/${patientId}`,
          {
            method: "GET",
          }
        );
        const resData = await res.json();
        if (resData.status === "success") {
          setConsultationData(resData.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getConsultationData();
  }, []);

  return (
    (patientData && (
      <div className="Consultation ">
        <div className="consultationHeader flex items-center justify-between">
          <SectionTitle title="Consultation" />
          <div className="user-data text-xl capitalize">
            {`${patientData.firstName} ${patientData.lastName}`}{" "}
            <span> {patientData.dateOfBirth}</span>
          </div>
        </div>
        <Tabs defaultValue="Traitement" className="w-full  mt-3 ">
          <TabsList className="tabs">
            <TabsTrigger value="Antécédents">Antécédents</TabsTrigger>
            <TabsTrigger value="consultation">consultation </TabsTrigger>
            <TabsTrigger value="Courbes">Courbes graphiques</TabsTrigger>
            <TabsTrigger value="Traitement">Traitement</TabsTrigger>
            <TabsTrigger value="Compte">Compte rendu</TabsTrigger>
            <TabsTrigger value="Certificat">Certificat et Courrier</TabsTrigger>
          </TabsList>
          <TabsContent value="Antécédents">
            <Entecedent />
          </TabsContent>
          <TabsContent value="consultation">
            <Tabs defaultValue="consultationForm" className="w-full">
              <TabsList>
                <TabsTrigger value="consultationForm">
                  Ajouter consultation
                </TabsTrigger>
                <TabsTrigger value="interrogatoire">interrogatoire</TabsTrigger>
                <TabsTrigger value="examenClinique">
                  Examen clinique
                </TabsTrigger>
                <TabsTrigger value="examenParaclinique">
                  Examen paraclinique
                </TabsTrigger>
              </TabsList>
              <TabsContent value="interrogatoire">
                <Motif data={consultationData} />
              </TabsContent>
              <TabsContent value="examenClinique">
                <ExamenClinique data={consultationData} />
              </TabsContent>
              <TabsContent value="examenParaclinique">
                examenParaclinique
              </TabsContent>
              <TabsContent value="consultationForm">
                <ConsultationForm setConsultationId={setConsultationId} />
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="Traitement">
            <Ordonnance
              consultationId={consultationId}
              patientData={patientData}
            />
          </TabsContent>
          <TabsContent value="Compte">FROM 4</TabsContent>
          <TabsContent value="Certificat">FROM 5</TabsContent>
          <TabsContent value="Courbes">
            <Courbes />
          </TabsContent>
        </Tabs>
      </div>
    )) || (
      <div className="flex justify-center items-center h-[100px] text-lg">
        Aucun patient trouvé!
      </div>
    )
  );
}

export default Consultation;
