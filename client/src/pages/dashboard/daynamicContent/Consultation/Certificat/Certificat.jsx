import CertificatMd from "./CertificatV1";
import { Btn } from "components";
import { useAuth } from "hooks";
import { Notify } from "utils";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

function Certificat({ patientData }) {
  const auth = useAuth();
  const [selectedDate, setSelectedDate] = useState({ from: "", to: "" });
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 10),
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      const from = date.from ? format(date.from, "dd-MM-yyyy") : "";
      const to = date.to ? format(date.to, "dd-MM-yyyy") : "";
      setSelectedDate({ from, to });
    }
  }, [date]);
  return (
    <>
      <CertificatMd patientData={patientData} selectedDate={selectedDate} />
      <div className=" flex items-center justify-center h-[400px]">
        <div className="CertificatModel bg-white text-black p-5 rounded-md w-[800px] pb-20">
          <div className="model-content flex flex-col gap-3 pl-6">
            <div className="text-2xl uppercase text-center font-bold italic text-blue-500">
              Certificat medical
            </div>
            <div className=" p-3 text-center my-10">
              je soussigné Dr, {auth.user.lastName} , certifie avoir <br />
              examiné (e) ce jour le (a) sus nomme(é) <br /> et atteste que son
              état de santé nécessite <br /> un arrêt de travail du{" "}
              <span>{selectedDate.from}</span> {""}
              au <span>{selectedDate.to}</span>.
            </div>
          </div>
        </div>
      </div>
      <div className="btnContent flex items-center justify-center gap-4">
        {/* <DateRangeComponent
          to={null}
          onDateChange={() => {}}
          setSelectedDate={setSelectedDate}
          nbrDays={10}
        /> */}
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd LLL y")} -
                      {format(date.to, "dd LLL y")}
                    </>
                  ) : (
                    format(date.from, "dd LLL y")
                  )
                ) : (
                  <span>sélectionnez une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                fromDate={new Date()}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Btn
          text="imprimer"
          btnFun={() => {
            if (!selectedDate) {
              Notify({
                type: "error",
                message: "Veuillez sélectionner une date valide",
              });
              return;
            }
            window.print();
          }}
        />
      </div>
    </>
  );
}

export default Certificat;
