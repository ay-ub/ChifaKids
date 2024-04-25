import { CiCalendarDate, MdDescription } from "assets/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
// import { Alert } from "components";
import { useState, useEffect } from "react";
import { getOrdonnanceByPatientId } from "../ConsultationFun";
function DisplayOrdonnance({ patientId }) {
  // const [traitmentDetails, setTraitmentDetails] = useState([
  //   {
  //     name: "Ibuprofène",
  //     dosage: 500,
  //     dosageUnit: "mg",
  //     duration: "7 jours",
  //     frequency: 3,
  //     eatingTime: "après",
  //     notes: "ne pas dépasser 3g/jour",
  //   },
  // ]);
  const [data, setData] = useState([]);
  const [traitement, setTraitement] = useState([]);

  useEffect(() => {
    getOrdonnanceByPatientId(patientId, setData);
  }, []);
  return (
    <div className="DisplayOrdonnance flex gap-5 items-start justify-between">
      <Accordion type="single" collapsible className="w-[350px]">
        <AccordionItem value="item-1 ">
          <AccordionTrigger>
            <div className="text-2xl">
              <CiCalendarDate />
            </div>
            Traitement date
          </AccordionTrigger>
          <AccordionContent>
            <ul className="h-[410px] overflow-y-auto overflow-x-hidden">
              {data &&
                data.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 })}
                    className="flex gap-2 items-center darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                    key={index}
                    onClick={() =>
                      setTraitement(item.ordonnances[0].medicaments)
                    }
                  >
                    <span className="bg-black rounded-full w-[20px] aspect-square flex items-center justify-center text-white">
                      {index + 1}
                    </span>
                    {item.ordonnances.map((traitment) => traitment.date)}
                  </motion.li>
                ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="flex-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="text-2xl">
              <MdDescription />
            </div>
            Détails du traitement
          </AccordionTrigger>
          <AccordionContent>
            <ul className="h-[410px] overflow-y-auto overflow-x-hidden">
              {traitement.length > 0 ? (
                traitement.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 })}
                    className="flex gap-x-2 justify-between items-center darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white "
                    key={index}
                  >
                    <div className="flex-1 flex flex-col items-start justify-between flex-wrap">
                      <div className="flex justify-between items-center  w-full">
                        <div className="flex gap-1 items-center">
                          <span className="bg-black rounded-full w-[20px] aspect-square flex items-center justify-center text-white">
                            {index + 1}
                          </span>
                          {`${item.name} ${item.dosage}`}
                        </div>
                        {`${item.prescription.duration}`}
                      </div>
                      <div className=" w-full flex justify-evenly items-center">
                        <div>{`${item.prescription.frequency} fois/jour ${item.prescription.eatingTime} le repas.`}</div>
                        <div>{` ${item.prescription.notes}`}</div>
                      </div>
                    </div>
                    {console.log(item)}
                  </motion.li>
                ))
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default DisplayOrdonnance;
