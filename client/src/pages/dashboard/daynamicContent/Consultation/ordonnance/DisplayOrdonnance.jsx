import { CiCalendarDate, MdDescription } from "assets/icon";
import { motion } from "framer-motion";
// import { Alert } from "components";
import { useState, useEffect } from "react";
import { getOrdonnanceByPatientId } from "../ConsultationFun";
function DisplayOrdonnance({ patientId, selectedDate }) {
  const [data, setData] = useState([]);
  const [traitement, setTraitement] = useState([]);

  useEffect(() => {
    getOrdonnanceByPatientId(patientId, setData, selectedDate);
  }, [selectedDate]);
  return (
    <div className="DisplayOrdonnance flex gap-5 items-start">
      <div className="bg-lightDark min-w-80  rounded-md h-[440px] ">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <CiCalendarDate />
            </span>
            <span>Traitement date</span>
          </span>
        </div>
        <ul className="h-[410px] overflow-y-auto overflow-x-hidden p-2">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                item?.medicaments.length > 0 && (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 })}
                    className="flex gap-2 items-center darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                    key={index}
                    onClick={() => setTraitement(item.medicaments)}
                  >
                    <span className="bg-black rounded-full w-[20px] aspect-square flex items-center justify-center text-white">
                      {index + 1}
                    </span>
                    <span>{item.date}</span>
                  </motion.li>
                )
              );
            })
          ) : (
            <motion.li
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={({ duration: 0.3 }, { delay: 0.1 })}
              className="flex items-start justify-between darkBg  p-2 rounded-sm mt-1 select-none "
            >
              Aucun traitement
            </motion.li>
          )}
        </ul>
      </div>
      <div className="flex-1 bg-lightDark min-w-80  rounded-md h-[440px] ">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <MdDescription />
            </span>
            <span>Détails du traitement</span>
          </span>
        </div>
        <ul className="h-[410px] overflow-y-auto overflow-x-hidden p-2">
          {traitement.length > 0 ? (
            traitement.map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                className="flex gap-x-2 justify-between items-center darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                key={index}
              >
                <div className="flex-1 flex flex-col items-start justify-between flex-wrap">
                  <div className="flex justify-between items-center  w-full">
                    <div className="flex gap-1 items-center">
                      {` - ${item.name} ${item.dosage}`}
                    </div>
                    {`${item.prescription.duration.toLowerCase()}`}
                    <div>{`${
                      item.prescription.frequency
                    } fois/jour ${item.prescription.eatingTime.toLowerCase()} le repas.`}</div>
                    <div>{` ${item.prescription.notes}`}</div>
                  </div>
                  <div className=" w-full flex justify-evenly items-center"></div>
                </div>
              </motion.li>
            ))
          ) : (
            <motion.li
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={({ duration: 0.3 }, { delay: 0.1 })}
              className="flex items-center justify-center select-none "
            >
              Aucun traitement
            </motion.li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DisplayOrdonnance;
