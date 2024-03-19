import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
function PopUp({ header, body }) {
  return (
    <Popover>
      <PopoverTrigger>{header}</PopoverTrigger>
      <PopoverContent>{body}</PopoverContent>
    </Popover>
  );
}

export default PopUp;
