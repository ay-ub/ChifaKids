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

function DateRangeComponent({
  className,
  onDateChange,
  setSelectedDate,
  nbrDays,
}) {
  const [date, setDate] = useState({
    from: nbrDays ? new Date() : addDays(new Date(), -90),
    to: nbrDays ? addDays(new Date(), nbrDays) : new Date(),
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      const from = date.from ? format(date.from, "yyyy-MM-dd") : "";
      const to = date.to ? format(date.to, "yyyy-MM-dd") : "";
      setSelectedDate({ from, to });
      onDateChange({ from, to });
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
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
                  {format(date.from, "dd LLL y")} -{format(date.to, "dd LLL y")}
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
            fromDate={addDays(new Date(), -90)}
            toDate={new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangeComponent;
