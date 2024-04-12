import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

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
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
    price: 1000,
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    price: 2000,
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    price: 3000,
  },
  {
    value: "remix",
    label: "Remix",
    price: 4000,
  },
  {
    value: "astro",
    label: "Astro",
    price: 5000,
  },
];

function SelectOp({
  setTotalPrice,
  totalPrice,
  operationList,
  setOperationList,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="selectOperation flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[350px] justify-between bg-background border border-input rounded-md px-4 py-2 "
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command className="w-[300px]">
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    // setOpen(false);
                  }}
                  className="flex items-center justify-between "
                >
                  <div className="flex items-center gap-y-1">
                    {framework.label}
                  </div>
                  <span
                    className=" inline-block border-red-400 border-2 px-2 py-1 rounded-md "
                    onClick={() => {
                      setTotalPrice(() => totalPrice + framework.price);
                      setOperationList(() => [...operationList, framework]);
                    }}
                  >
                    ajouter
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SelectOp;
