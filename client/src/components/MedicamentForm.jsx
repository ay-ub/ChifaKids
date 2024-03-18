import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputError } from "components";

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: medicament.name || "",
      type: medicament.type || "Tablet",
      dosage: medicament.dosage || "",
    },
  });

  const onSubmit = (medicamentData) => {
    submitFun({ ...medicamentData, dosageUnit, type: typeOfDrug });
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
            required: { value: true, message: "name is required" },
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
              required: { value: true, message: "dosage is required" },
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
      <button type="submit" className="btn bg-[#8b63e9] mt-5">
        {medicament.name ? "Edit Medicament" : "Add Medicament"}
      </button>
    </form>
  );
}

export default MedicamentForm;
