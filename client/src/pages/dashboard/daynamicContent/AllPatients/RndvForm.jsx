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

import { FaPlusCircle } from "assets/icon";
import { Notify } from "utils";

function RndvForm({ patientId }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("08:00");
  const createRndv = async () => {
    try {
      const res = await fetch("http://localhost:3000/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          time: time,
          patientId,
        }),
      });
      const data = await res.json();
      if (data.status == "success") {
        Notify({ type: "success", message: "Le rendez-vous a été ajouté" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex-1 flex items-center gap-3">
        <span className="flex-1 flex justify-center items-center rounded-sm select-none border p-1">
          Date
        </span>
        <Popover id="date" className="flex-1">
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "flex-1 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "yyyy-MM-dd") : <span>Rendez-vous</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 ">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              fromDate={new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-3">
        <span className="flex-1 flex justify-center items-center rounded-sm select-none border">
          Heure
        </span>
        <input
          type="time"
          id="appointment-time"
          name="appointment-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <Button
        variant="outline"
        className="flex-1"
        onClick={() => {
          createRndv();
        }}
      >
        <FaPlusCircle className="mr-2 h-4 w-4" />
        <span>Ajouter</span>
      </Button>
    </div>
  );
}

export default RndvForm;
