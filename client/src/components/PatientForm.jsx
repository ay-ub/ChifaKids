import { useForm } from "react-hook-form";

// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
          <label htmlFor="firstName">first Name :</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your firstName"
            {...register("firstName", {
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Invalid first name",
              },
              required: { value: true, message: "first Name is required" },
              lenghth: {
                value: 3,
                message: "first Name is too short",
              },
            })}
            className={`${errors.firstName ? "inValid" : null}`}
          />
          {<InputError error={errors.firstName} />}
        </div>
        <div className="input-group flex-1">
          <label htmlFor="lastName">last Name :</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last Name"
            {...register("lastName", {
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Invalid last Name",
              },
              required: { value: true, message: "last Name is required" },
              lenghth: {
                value: 3,
                message: "last Name is too short",
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
        <label htmlFor="">gender : </label>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MALE">MALE</SelectItem>
          <SelectItem value="FEMALE">
            <span>
              {/* <FaFemale /> */}
              FEMALE
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-1">
        <label htmlFor="date"> date of birth :</label>
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
              {date ? format(date, "yyyy-MM-dd") : <span>date of birth</span>}
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
          <label htmlFor="parent">parent Name :</label>
          <input
            type="text"
            id="parent"
            placeholder="Enter parent Name"
            {...register("parent", {
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Invalid parent Name",
              },
              required: { value: true, message: "parent Name is required" },
              lenghth: {
                value: 3,
                message: "parent Name is too short",
              },
            })}
            className={`${errors.parent ? "inValid" : null}`}
          />
          {<InputError error={errors.parent} />}
        </div>
        <div className="input-group flex-1">
          <label htmlFor="numberPhone">Phone number :</label>
          <input
            type="text"
            id="numberPhone"
            placeholder="05 -- -- -- --"
            {...register("numberPhone", {
              pattern: {
                value: /^0[5-7]{1}[0-9]{8}$/,
                message: "Invalid phone number",
              },
              required: { value: true, message: "Phone number is required" },
              lenghth: {
                value: 10,
                message: "Phone number is too short",
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
