import { Checkbox } from "@/components/ui/checkbox";
function CheckboxWithText({ label, description, setChecked }) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="terms1"
        onCheckedChange={(e) => {
          setChecked(e);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
        >
          {label}
        </label>
        <p className="text-sm text-muted-foreground select-none">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CheckboxWithText;
