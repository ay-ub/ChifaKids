import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  IoIosList,
  FaPlusCircle,
  MdDescription,
  AiOutlineDelete,
} from "assets/icon";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { InputError, Alert } from "components";

import { getAllMedicament, Notify } from "utils";
import SelectMedicament from "./SelectMedicament";

import OrdonnanceModel from "./OrdonnanceModel";

function Ordonnance({ consultationId, patientData }) {
  const [selectedMed, setSelectedMed] = useState({
    id: "",
    name: "",
  });

  const [medicamentList, setMedicamentList] = useState([]);
  useEffect(() => {
    getAllMedicament(setMedicamentList);
  }, []);

  const [traitmentDetails, setTraitmentDetails] = useState([]);

  const [eatingTime, setEatingTime] = useState("");
  const handleRadioChange = (e) => {
    setEatingTime(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!selectedMed.id) {
      Notify({ type: "error", message: "choisir un médicament" });
      return;
    }
    const obj = {
      ...data,
      ...selectedMed,
      medicamentId: selectedMed.id,
      eatingTime,
    };
    setTraitmentDetails((prev) => [...prev, obj]);
  };

  const createOrdonnance = async () => {
    try {
      if (traitmentDetails.length === 0) {
        Notify({ type: "error", message: "aucun traitement" });
        return;
      }
      window.print();
      const res = await fetch(`http://localhost:3000/ordonnance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consultationId,
          medicamentData: traitmentDetails,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        Notify({ type: "success", message: "ordonnance a été ajouté." });
      } else {
        Notify({ type: "error", message: "N’a pas ajouté de ordonnance." });
      }
    } catch (error) {
      Notify({ type: "error", message: "N’a pas ajouté de ordonnance." });
    }
  };

  return (
    <div>
      <div className="ordonnanceMain flex justify-between items-start gap-3 w-full">
        <Accordion type="single" collapsible className="w-[350px]">
          <AccordionItem value="item-1 ">
            <AccordionTrigger>
              <div className="text-2xl">
                <IoIosList />
              </div>
              Traitement prêt
            </AccordionTrigger>
            <AccordionContent>
              <ul className="h-[440px] overflow-y-auto overflow-x-hidden">
                <motion.li
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
                >
                  traitement 1
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
                >
                  traitement 2
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
                >
                  traitement 3
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
                >
                  traitement 4
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
                >
                  traitement 5
                </motion.li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-[400px] ">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="text-2xl">
                <FaPlusCircle />
              </div>
              Nouveau traitement
            </AccordionTrigger>
            <AccordionContent className="p-2 h-[455px]">
              <SelectMedicament
                selectedMed={selectedMed}
                medicamentList={medicamentList}
                setSelectedMed={setSelectedMed}
              />
              {selectedMed.id != "" ? (
                <motion.form
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className="flex flex-col mt-2 "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="input-group flex-1">
                    <label htmlFor="période">la période de traitement: </label>
                    <input
                      type="text"
                      id="période"
                      placeholder="Exemple : 1 semaine ou 1 boite ..."
                      {...register("duration", {
                        required: {
                          value: true,
                          message: "période est nécessaire",
                        },
                      })}
                      className={`${errors.duration ? "inValid" : null}`}
                    />
                    {<InputError error={errors.duration} />}
                  </div>
                  <div className="input-group flex-1">
                    <label htmlFor="nbrFois">Nombre de fois/jour :</label>
                    <input
                      type="text"
                      id="nbrFois"
                      placeholder="Exemple : 1 ou 2  ou 3 ..."
                      {...register("frequency", {
                        required: {
                          value: true,
                          message: "ce champ est nécessaire",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "nombre incorrecte",
                        },
                      })}
                      className={`${errors.frequency ? "inValid" : null}`}
                    />
                    {<InputError error={errors.frequency} />}
                  </div>
                  <RadioGroup
                    defaultValue="Avant"
                    className="mb-3 flex items-center justify-evenly flex-wrap"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="AVANT"
                        id="Avant"
                        onClick={handleRadioChange}
                      />
                      <Label htmlFor="Avant">Avant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="PENDANT"
                        id="pendant"
                        onClick={handleRadioChange}
                      />
                      <Label htmlFor="pendant">Pendant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="APRES"
                        id="après"
                        onClick={handleRadioChange}
                      />
                      <Label htmlFor="après">Après</Label>
                    </div>
                  </RadioGroup>
                  <div className="input-group flex-1">
                    <label htmlFor="remarque">Remarque :</label>
                    <input
                      type="text"
                      id="remarque"
                      placeholder="Exemple : qsp ..."
                      {...register("notes")}
                    />
                  </div>
                  <div className="flex mt-[50px] gap-4">
                    <button type="submit" className="btn bg-[#8b63e9] flex-1 ">
                      confirmer
                    </button>
                    <button
                      type="reset"
                      className="flex-1 bg-ph rounded-lg hover:text-white"
                    >
                      Annuler
                    </button>
                  </div>
                </motion.form>
              ) : (
                <p className="text-center text-red-500">
                  Veuillez choisir un médicament
                </p>
              )}
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
              <ul className="h-[375px] overflow-y-auto overflow-x-hidden">
                {traitmentDetails.length > 0 ? (
                  traitmentDetails.map((traitment, index) => (
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
                            {`${traitment.name} ${traitment.dosage}${traitment.dosageUnit} `}
                          </div>
                          {`${traitment.duration}`}
                        </div>
                        <div className=" w-full flex justify-evenly items-center">
                          <div>{`${traitment.frequency} fois/jour ${traitment.eatingTime} le repas.`}</div>
                          <div>{` ${traitment.notes}`}</div>
                        </div>
                      </div>
                      <Alert
                        title="Voulez-vous supprimer ce traitement ?"
                        btnFun={() =>
                          setTraitmentDetails((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        description="Cette action ne peut pas être annulée. "
                        confirmBtn="Oui, Supprimer"
                      >
                        <span className="text-red-400 select-none text-2xl">
                          <AiOutlineDelete />
                        </span>
                      </Alert>
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
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={({ duration: 0.3 }, { delay: 0.1 })}
                className="flex mt-5 gap-4"
              >
                <button
                  type="button"
                  className="btn bg-[#8b63e9] flex-1"
                  onClick={createOrdonnance}
                >
                  Enregistrer et imprimer
                </button>
                <button
                  type="button"
                  className="flex-1 bg-ph rounded-lg hover:text-white border-[1px] border-ph"
                  onClick={() => setTraitmentDetails([])}
                >
                  Annuler
                </button>
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <OrdonnanceModel
        traitmentDetails={traitmentDetails}
        patientData={patientData}
      />
    </div>
  );
}

export default Ordonnance;
