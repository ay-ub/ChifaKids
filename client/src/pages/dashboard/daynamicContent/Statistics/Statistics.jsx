import { SectionTitle, CardModel, PieChart } from "components";
import { FaFemale, FaStethoscope, FaMale, MdGroups } from "assets/icon";
import { motion } from "framer-motion";
const iconStyle = "text-3xl text-muted-foreground";
const divStyle = "border rounded-md p-4 h-[410px]";
import { useState, useEffect } from "react";
import { container, item } from "data";
function Statistics() {
  const [statisticsData, setStatisticsData] = useState([]);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/statistics");
        const data = await response.json();

        if (data.status === "success" && data.data) {
          console.log(data.data);
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
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-3 h-[390px] overflow-y-auto overflow-x-hidden"
            >
              {statisticsData.topDoctors?.length > 0 ? (
                statisticsData?.topDoctors.map((doctor, index) => {
                  return (
                    doctor?.user && (
                      <motion.li
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        // variants={item}
                        key={index}
                        className="flex items-center justify-between gap-2 darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white hover:pl-3 transition-all duration-500"
                      >
                        <span className="flex-1 text-left">
                          - {doctor.user?.firstName} {doctor?.user?.lastName}
                        </span>
                        <span className="text-right">
                          {doctor?.consultationCount} Consultations
                        </span>
                      </motion.li>
                    )
                  );
                })
              ) : (
                <li className="flex justify-center items-center mt-3 text-lg">
                  <span>no data</span>
                </li>
              )}
            </motion.ul>
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
