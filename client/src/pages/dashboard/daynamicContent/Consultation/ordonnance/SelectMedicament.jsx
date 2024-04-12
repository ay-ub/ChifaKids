import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function SelectMedicament({ selectedMed, medicamentList, setSelectedMed }) {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[300px] max-w-[400px] justify-between"
          >
            {selectedMed.id
              ? medicamentList.find((med) => med.id === selectedMed.id)?.name
              : "Choisissez le médicament..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search med..." />
            <CommandEmpty>No med found.</CommandEmpty>
            <CommandGroup>
              {medicamentList.map((med) => (
                <CommandItem
                  key={med.id}
                  onSelect={() => {
                    setSelectedMed(
                      med.id === selectedMed.id ? { id: "" } : med
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMed.id === med.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {med.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SelectMedicament;
