import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAuth } from "hooks";

function Ordonnance({ consultationId, patientData }) {
  const [selectedMed, setSelectedMed] = useState({
    id: "",
    name: "",
  });
  const [savedOrdonnance, setSavedOrdonnance] = useState([]);
  const auth = useAuth();
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
    reset,
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
    reset();
    setSelectedMed({ id: "", name: "" });
  };
  const [isSaved, setIsSaved] = useState(false);
  const [title, setTitle] = useState(null);

  const getSavedOrdonnance = async () => {
    try {
      const res = await fetch(`/api/ordonnance/saved`);
      const data = await res.json();
      if (data.status === "success") {
        setSavedOrdonnance(data.data);
      } else {
        Notify({ type: "error", message: data.message });
      }
    } catch (error) {
      Notify({ type: "error", message: "N’a pas trouvé de ordonnance." });
    }
  };

  const handleDeleteSavedOrdonnance = async (id) => {
    try {
      const res = await fetch(`/api/ordonnance/saved/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        Notify({ type: "success", message: "Le traitement a été supprimé." });
        const newSavedOrdonnance = savedOrdonnance.filter(
          (item) => item.id !== id
        );
        setSavedOrdonnance(newSavedOrdonnance);
      } else {
        Notify({
          type: "error",
          message: "Impossible de supprimer le traitement.",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible de supprimer le traitement.",
      });
    }
  };

  const createOrdonnance = async () => {
    try {
      if (traitmentDetails.length === 0) {
        Notify({ type: "error", message: "aucun traitement" });
        return;
      }
      if (isSaved && !title) {
        Notify({
          type: "error",
          message: "Veuillez entrer un titre pour l'ordonnance",
        });
        return;
      }
      const res = await fetch(`/api/ordonnance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consultationId,
          consultationData: {
            doctorId: auth.user.id,
            patientId: patientData.id,
          },
          medicamentData: traitmentDetails,
          title: title || "Traitement",
          isSaved,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        if (isSaved) {
          getSavedOrdonnance();
          setTitle("");
          setIsSaved(false);
        }
        await getSavedOrdonnance();
        window.print();
        Notify({ type: "success", message: "ordonnance a été ajouté." });
        setTraitmentDetails([]);
      } else {
        Notify({ type: "error", message: data.message });
      }
    } catch (error) {
      Notify({ type: "error", message: "N’a pas ajouté de ordonnance." });
    }
  };

  useEffect(() => {
    getSavedOrdonnance();
  }, []);

  function transformData(updated) {
    return {
      duration: updated.savedPrescription.duration,
      frequency: updated.savedPrescription.frequency,
      notes: updated.savedPrescription.notes,
      id: updated.savedPrescription.id,
      name: updated.name,
      type: updated.type,
      dosage: updated.dosage,
      medicamentId: updated.savedPrescription.medicamentId,
      eatingTime: updated.savedPrescription.eatingTime,
    };
  }
  const selectSavedOrdonnance = (item) => {
    let newMedicamentList = [];
    item.forEach((med) => {
      return newMedicamentList.push(transformData(med));
    });
    console.log("newMedicamentList = ", newMedicamentList);
    setTraitmentDetails(newMedicamentList);
  };

  return (
    <div>
      <div className='ordonnanceMain flex justify-between items-start gap-3 w-full'>
        <div className='w-[350px] bg-lightDark  rounded-md h-[calc(100vh-235px)]  overflow-y-auto '>
          <div className=' items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none'>
            <span className='flex flex-1 gap-2 items-center justify-center'>
              <span className='icon'>
                <IoIosList />
              </span>
              <span>Traitement Prêt</span>
            </span>
          </div>
          <ul className='h-[calc(100vh-283px)]  overflow-y-auto overflow-x-hidden p-2'>
            {savedOrdonnance.map((item, index) => {
              return (
                item?.medicaments.length > 0 && (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 })}
                    className='flex gap-2 items-center darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white '
                    key={index}
                  >
                    <span className='bg-black rounded-full w-[20px] aspect-square flex items-center justify-center text-white'>
                      {index + 1}
                    </span>
                    <span
                      className='flex-1'
                      onClick={() => selectSavedOrdonnance(item.medicaments)}
                    >
                      {item.title}
                    </span>
                    <Alert
                      title='Voulez-vous vraiment supprimer ce traitement ?'
                      btnFun={() => {
                        handleDeleteSavedOrdonnance(item.id);
                      }}
                      description='Cette action ne peut pas être annulée. '
                      confirmBtn='Oui, Supprimer'
                    >
                      <span className='text-red-400 select-none '>
                        <AiOutlineDelete className='text-2xl' />
                      </span>
                    </Alert>
                  </motion.li>
                )
              );
            })}
          </ul>
        </div>
        <div className=' w-[350px] bg-lightDark  rounded-md h-[calc(100vh-235px)] overflow-y-auto '>
          <div className='flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none'>
            <span className='flex flex-1 gap-2 items-center justify-center'>
              <span className='icon'>
                <FaPlusCircle />
              </span>
              <span>Nouveau traitement</span>
            </span>
          </div>
          <div className='px-2'>
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
                className='flex flex-col mt-2 '
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='input-group flex-1'>
                  <label htmlFor='période'>la période de traitement: </label>
                  <input
                    type='text'
                    id='période'
                    placeholder='Exemple : 1 semaine ou 1 boite ...'
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
                <div className='input-group flex-1'>
                  <label htmlFor='nbrFois'>Nombre de fois/jour :</label>
                  <input
                    type='text'
                    id='nbrFois'
                    placeholder='Exemple : 1 ou 2  ou 3 ...'
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
                  defaultValue='Avant'
                  className='mb-3 flex items-center justify-evenly flex-wrap'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='AVANT'
                      id='Avant'
                      onClick={handleRadioChange}
                    />
                    <Label htmlFor='Avant'>Avant</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='PENDANT'
                      id='pendant'
                      onClick={handleRadioChange}
                    />
                    <Label htmlFor='pendant'>Pendant</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='APRES'
                      id='après'
                      onClick={handleRadioChange}
                    />
                    <Label htmlFor='après'>Après</Label>
                  </div>
                </RadioGroup>
                <div className='input-group flex-1'>
                  <label htmlFor='remarque'>Remarque :</label>
                  <input
                    type='text'
                    id='remarque'
                    placeholder='Exemple : qsp ...'
                    {...register("notes")}
                  />
                </div>
                <div className='flex mt-[50px] gap-4'>
                  <button type='submit' className='btn bg-[#8b63e9] flex-1 '>
                    confirmer
                  </button>
                  <button
                    type='reset'
                    className='flex-1 bg-ph rounded-lg hover:text-white'
                  >
                    Annuler
                  </button>
                </div>
              </motion.form>
            ) : (
              <p className='text-center text-red-500'>
                Veuillez choisir un médicament
              </p>
            )}
          </div>
        </div>
        <div className=' flex-1 bg-lightDark  rounded-md h-[calc(100vh-235px)] overflow-y-auto '>
          <div className='flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none'>
            <span className='flex flex-1 gap-2 items-center justify-center'>
              <span className='icon'>
                <MdDescription />
              </span>
              <span>Détails du traitement</span>
            </span>
          </div>
          <ul className='h-[337px] overflow-y-auto overflow-x-hidden px-2 py-1'>
            {traitmentDetails.length > 0 ? (
              traitmentDetails.map((traitment, index) => (
                <motion.li
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={({ duration: 0.3 }, { delay: 0.1 })}
                  className='flex gap-x-2 justify-between items-center darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white '
                  key={index}
                >
                  <div className='flex-1 flex flex-col items-start justify-between flex-wrap'>
                    <div className='flex justify-between items-center  w-full'>
                      <div className='flex gap-1 items-center'>
                        <span className='bg-black rounded-full w-[20px] aspect-square flex items-center justify-center text-white'>
                          {index + 1}
                        </span>
                        {`${traitment.name} ${traitment.dosage}`}
                      </div>
                      {`${
                        traitment?.savedPrescription
                          ? traitment?.savedPrescription?.duration
                          : traitment.duration
                      }`}
                    </div>
                    <div className=' w-full flex justify-evenly items-center'>
                      <div>{`${
                        traitment?.savedPrescription
                          ? traitment.savedPrescription.frequency
                          : traitment.frequency
                      } fois/jour ${
                        traitment?.savedPrescription
                          ? traitment?.savedPrescription?.eatingTime
                          : traitment?.eatingTime
                      } le repas.`}</div>
                      <div>{` ${
                        traitment?.savedPrescription
                          ? traitment?.savedPrescription?.notes
                          : traitment?.notes
                      }`}</div>
                    </div>
                  </div>
                  <Alert
                    title='Voulez-vous supprimer ce traitement ?'
                    btnFun={() =>
                      setTraitmentDetails((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    description='Cette action ne peut pas être annulée. '
                    confirmBtn='Oui, Supprimer'
                  >
                    <span className='text-red-400 select-none text-2xl'>
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
                className='flex items-start justify-center  p-2 rounded-sm mt-1 select-none '
              >
                Aucun traitement
              </motion.li>
            )}
          </ul>
          <div className='flex items-center px-3  gap-10 h-8 m-2'>
            <div className='flex-1 flex items-center  space-x-2'>
              <Checkbox
                id='terms2'
                onCheckedChange={(e) => {
                  setIsSaved(e);
                }}
                checked={isSaved}
                className='darkBg w-6 h-6'
              />
              <label
                htmlFor='terms2'
                className='text-sm select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Enregistrez ce modèle
              </label>
            </div>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={({ duration: 0.3 }, { delay: 0.1 })}
                className='flex-1 flex items-center gap-2'
              >
                <input
                  type='text'
                  placeholder='Nom du modèle'
                  value={title}
                  maxLength={30}
                  onChange={(e) => setTitle(e.target.value)}
                  className='flex-1 border darkBg py-1 rounded-md px-2'
                />
              </motion.div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={({ duration: 0.3 }, { delay: 0.1 })}
            className='flex mt-2 gap-4 px-2'
          >
            <button
              type='button'
              className='btn bg-p flex-1'
              onClick={createOrdonnance}
            >
              Enregistrer et imprimer
            </button>
            <button
              type='button'
              className='flex-1 darkBg  rounded-lg text-black'
              onClick={() => setTraitmentDetails([])}
            >
              Annuler
            </button>
          </motion.div>
        </div>
      </div>
      <OrdonnanceModel
        traitmentDetails={traitmentDetails}
        patientData={patientData}
      />
    </div>
  );
}

export default Ordonnance;
