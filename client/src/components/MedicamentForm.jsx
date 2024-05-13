import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputError } from "components";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function MedicamentForm({ medicament, submitFun }) {
  const [dosageUnit, setDosageUnit] = useState(medicament.dosageUnit || "mL");
  const [typeOfDrug, setTypeOfDrug] = useState(medicament.type || "Tablet");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: medicament.name || "",
      type: medicament.type || "Tablet",
      dosage: medicament.dosage || "",
    },
  });

  const onSubmit = (medicamentData) => {
    submitFun({
      ...medicamentData,
      dosage: `${medicamentData.dosage} ${dosageUnit}`,
      type: typeOfDrug,
    });
  };
  return (
    <form
      className="form w-[550px] flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="input-group flex-1">
        <label htmlFor="name">le nom du médicament: </label>
        <input
          type="text"
          id="name"
          placeholder="Entrez le nom du médicament"
          {...register("name", {
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Invalid name",
            },
            required: { value: true, message: "nom est nécessaire" },
            lenghth: {
              value: 3,
              message: "full name is too short",
            },
          })}
          className={`${errors.name ? "inValid" : null}`}
        />
        {<InputError error={errors.name} />}
      </div>
      <Select
        onValueChange={(e) => {
          setTypeOfDrug(e);
        }}
        value={typeOfDrug}
      >
        <label htmlFor="">type de médicament : </label>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="sélectionner le type de médicament " />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Tablet">comprimé</SelectItem>
          <SelectItem value="Capsule">Capsule</SelectItem>
          <SelectItem value="Liquid">liquide</SelectItem>
          <SelectItem value="Injection">Injection</SelectItem>
          <SelectItem value="Cream">crème</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-4 mt-5">
        <div className="input-group flex-1">
          <label htmlFor="dosage">dosage :</label>
          <input
            type="text"
            id="dosage"
            placeholder="Entrer le dosage"
            {...register("dosage", {
              required: { value: true, message: "dosage est nécessaire" },
              pattern: {
                value: /^[0-9]+$/,
                message: "valeur incorrecte",
              },
            })}
            className={`${errors.dosage ? "inValid" : null}`}
          />
          {<InputError error={errors.dosage} />}
        </div>
        <div className="flex flex-col self-start">
          <Select
            onValueChange={(e) => {
              setDosageUnit(e);
            }}
            value={dosageUnit}
          >
            <label htmlFor="">unité de dosage : </label>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="sélectionner l’unité de dosage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mL">Millilitre (mL)</SelectItem>
              <SelectItem value="mg">milligrams (mg)</SelectItem>
              <SelectItem value="g">gram (g)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-5">
        <button
          type="submit"
          className="flex-1 bg-p mt-5 rounded-md text-white"
        >
          {medicament.name ? "Modifier le médicament" : "Ajouter le médicament"}
        </button>
        <Button
          onClick={() => {
            reset();
          }}
          className="flex-1 border bg-ph inline-block mt-5 p-2 rounded-md textColor"
        >
          RESET
        </Button>
      </div>
    </form>
  );
}

export default MedicamentForm;
