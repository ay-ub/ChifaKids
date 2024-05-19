import Entecedent from "./entecedent/Entecedent.jsx";
import ConsultationForm from "./ConsultationForm.jsx";
import Courbes from "./Courbes.jsx";
import { SectionTitle, DateRangeComponent } from "components";
import Motif from "./Motif.jsx";
import { useState, useEffect } from "react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import ExamenClinique from "./examenClinique.jsx";
import Ordonnance from "./ordonnance/Ordonnance.jsx";
import ExmnParaClinique from "./ExmnParaClinique.jsx";
import { calculateAge } from "utils";
import { getConsultationData, getPatientData } from "./ConsultationFun.js";
import DisplayOrdonnance from "./ordonnance/DisplayOrdonnance.jsx";
import CmptRnd from "./compteRendu/CmptRnd.jsx";
import DisplayCmptRendi from "./compteRendu/DisplayCmptRendi.jsx";
import Certificat from "./Certificat/Certificat.jsx";

function Consultation() {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState();
  const [consultationData, setConsultationData] = useState([]);
  const [consultationId, setConsultationId] = useState();
  const [selectedDate, setSelectedDate] = useState({ from: "", to: "" });

  //get patient data
  useEffect(() => {
    getPatientData(setPatientData, patientId);
  }, [patientId]);

  //get consultation of patient
  useEffect(() => {
    getConsultationData(setConsultationData, patientId);
  }, []);

  const getConsultationByDate = async ({ from, to }) => {
    try {
      const result = await fetch(`/api/consultations/date/${patientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to }),
      });
      const data = await result.json();
      if (data.status === "success") {
        setConsultationData(data.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    (patientData && (
      <div className="Consultation ">
        <div className="consultationHeader flex items-center justify-between">
          <SectionTitle title="Consultation" />
          <div className="flex gap-4">
            <div className="user-data text-xl capitalize">
              <span>{`${patientData.firstName} ${patientData.lastName}`}</span>
              <span>
                {" "}
                Âge : {calculateAge(new Date(), patientData.dateOfBirth)} mois.
              </span>
            </div>
          </div>
        </div>
        <Tabs defaultValue="nouveau" className="w-full mt-3 ">
          <TabsList className="tabs">
            <TabsTrigger value="nouveau">Nouveau</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>
          <TabsContent value="nouveau">
            <Tabs defaultValue="Compte" className="w-full ">
              <TabsList className="tabs">
                <TabsTrigger value="consultation">consultation </TabsTrigger>
                <TabsTrigger value="Antécédents">Antécédents</TabsTrigger>
                <TabsTrigger value="Courbes">Courbes graphiques</TabsTrigger>
                <TabsTrigger value="Traitement">Traitement</TabsTrigger>
                <TabsTrigger value="Compte">Compte rendu</TabsTrigger>
                <TabsTrigger value="Certificat">
                  Certificat et Courrier
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Antécédents">
                <Entecedent />
              </TabsContent>
              <TabsContent value="consultation">
                <ConsultationForm
                  setConsultationId={setConsultationId}
                  setConsultationData={setConsultationData}
                />
              </TabsContent>
              <TabsContent value="Traitement">
                <Ordonnance
                  consultationId={consultationId}
                  patientData={patientData}
                />
              </TabsContent>
              <TabsContent value="Compte">
                <CmptRnd
                  consultationId={consultationId}
                  patientId={patientId}
                />
              </TabsContent>
              <TabsContent value="Certificat">
                <Certificat patientData={patientData} />
              </TabsContent>
              <TabsContent value="Courbes">
                <Courbes patientData={patientData} />
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="historique">
            <Tabs defaultValue="consultation" className="w-full ">
              <div className="flex items-center justify-between">
                <TabsList className="tabs">
                  <TabsTrigger value="consultation">consultation </TabsTrigger>
                  <TabsTrigger value="Antécédents">Antécédents</TabsTrigger>
                  <TabsTrigger value="Courbes">Courbes graphiques</TabsTrigger>
                  <TabsTrigger value="Traitement">Traitement</TabsTrigger>
                  <TabsTrigger value="Compte">Compte rendu</TabsTrigger>
                  <TabsTrigger value="Certificat">
                    Certificat et Courrier
                  </TabsTrigger>
                </TabsList>
                <DateRangeComponent
                  onDateChange={getConsultationByDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <TabsContent value="Antécédents">
                <Entecedent />
              </TabsContent>
              <TabsContent value="consultation">
                <Tabs defaultValue="interrogatoire" className="w-full">
                  <TabsList>
                    <TabsTrigger value="interrogatoire">
                      interrogatoire
                    </TabsTrigger>
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
                    <ExmnParaClinique data={consultationData} />
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value="Traitement">
                <DisplayOrdonnance
                  patientId={patientId}
                  selectedDate={selectedDate}
                />
              </TabsContent>
              <TabsContent value="Compte">
                <DisplayCmptRendi
                  patientId={patientId}
                  selectedDate={selectedDate}
                />
              </TabsContent>
              <TabsContent value="Certificat">FROM 5</TabsContent>
              <TabsContent value="Courbes">
                <Courbes patientData={patientData} />
              </TabsContent>
            </Tabs>
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
