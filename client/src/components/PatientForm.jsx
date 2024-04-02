import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputError from "./InputError";

function PatientForm({ patient, subFun }) {
  const [gender, setGender] = useState(patient.gender || "MALE");
  const [date, setDate] = useState(patient.dateOfBirth || new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: patient.firstName || "",
      lastName: patient.lastName || "",
      numberPhone: patient.numberPhone || "",
      parent: patient.parent || "",
    },
  });
  const onSubmit = (data) => {
    const dateOfBirth = format(date, "yyyy-MM-dd");
    subFun({ ...data, gender, dateOfBirth });
  };
  return (
    <form
      className="form w-[550px] flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-4 ">
        <div className="input-group flex-1">
          <label htmlFor="firstName">Prénom: :</label>
          <input
            type="text"
            id="firstName"
            placeholder="Entrez votre prénom :"
            {...register("firstName", {
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Prénom non valide",
              },
              required: { value: true, message: "Prénom est nécessaire" },
              lenghth: {
                value: 3,
                message: "Le prénom est trop court",
              },
            })}
            className={`${errors.firstName ? "inValid" : null}`}
          />
          {<InputError error={errors.firstName} />}
        </div>
        <div className="input-group flex-1">
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            placeholder="Entrez votre Nom :"
            {...register("lastName", {
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Nom non valide",
              },
              required: { value: true, message: "Nom est nécessaire" },
              lenghth: {
                value: 3,
                message: "Le nom est trop court",
              },
            })}
            className={`${errors.lastName ? "inValid" : null}`}
          />
          {<InputError error={errors.lastName} />}
        </div>
      </div>
      <Select
        onValueChange={(e) => {
          setGender(e);
        }}
        value={gender}
      >
        <label>sexe : </label>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner le sexe :" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MALE">MALE</SelectItem>
          <SelectItem value="FEMALE">FEMALE</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-1">
        <label htmlFor="date"> date de naissance :</label>
        <Popover id="date">
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "yyyy-MM-dd")
              ) : (
                <span>date de naissance</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-4">
        <div className="input-group flex-1">
          <label htmlFor="parent">le nom du père :</label>
          <input
            type="text"
            id="parent"
            placeholder="Entrez le nom du père :"
            {...register("parent", {
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Nom du père non valide",
              },
              required: {
                value: true,
                message: "le nom du père est nécessaire",
              },
              lenghth: {
                value: 3,
                message: "Le nom du père est trop court",
              },
            })}
            className={`${errors.parent ? "inValid" : null}`}
          />
          {<InputError error={errors.parent} />}
        </div>
        <div className="input-group flex-1">
          <label htmlFor="numberPhone">numéro de téléphone :</label>
          <input
            type="text"
            id="numberPhone"
            placeholder="05 -- -- -- --"
            {...register("numberPhone", {
              pattern: {
                value: /^0[5-7]{1}[0-9]{8}$/,
                message: "Numéro de téléphone non valide",
              },
              required: {
                value: true,
                message: "numéro de téléphone est nécessaire",
              },
              lenghth: {
                value: 10,
                message: "Le numéro de téléphone est trop court",
              },
            })}
            className={`${errors.numberPhone ? "inValid" : null}`}
          />
          {<InputError error={errors.numberPhone} />}
        </div>
      </div>
      <button type="submit" className="sign bg-[#8b63e9] mt-5">
        {patient.firstName === ""
          ? "Ajouter patient"
          : "mettre à jour le patient"}
      </button>
    </form>
  );
}

export default PatientForm;
