import { SectionTitle, CardModel, PieChart } from "components";
import { FaFemale, FaStethoscope, FaMale, MdGroups } from "assets/icon";

const iconStyle = "text-3xl text-muted-foreground";
const divStyle = "border rounded-md p-4 h-[410px]";
import { useState, useEffect } from "react";
function Statistics() {
  const [statisticsData, setStatisticsData] = useState([]);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("http://localhost:3000/statistics");
        const data = await response.json();

        if (data.status === "success" && data.data) {
          console.log(data);
          setStatisticsData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatistics();
  }, []);
  return (
    <div>
      <SectionTitle title="Statistiques" />
      <div className="flex flex-col mt-5">
        <div className="flex gap-5 flex-wrap">
          <CardModel
            title={"Consultation"}
            description={"nombre Total de consultation "}
            nbr={statisticsData.totalNbrConsultation}
            icon={<FaStethoscope className={iconStyle} />}
          />
          <CardModel
            title={"Patient"}
            description={"nombre de patient Fille"}
            nbr={statisticsData.nbrPatientGirls}
            icon={<FaFemale className={iconStyle} />}
          />
          <CardModel
            title={"Patient"}
            description={"nombre de patient Garçon"}
            nbr={statisticsData.nbrPatientBoys}
            icon={<FaMale className={iconStyle} />}
          />
          <CardModel
            title={"Utilisateur de l'application"}
            description={"nombre Total d'utilisateur"}
            nbr={statisticsData.nbrUsers}
            icon={<MdGroups className={iconStyle} />}
          />
        </div>
        <div className="flex gap-5 items-start mt-5">
          <div className={`left flex-1 ${divStyle}`}>
            <PieChart />
          </div>
          <div className={`right w-[380px] ${divStyle}`}>
            <SectionTitle title="Plus actif" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
