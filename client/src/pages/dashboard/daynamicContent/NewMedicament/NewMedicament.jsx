import { MedicamentForm, SectionTitle } from "components";
import { addMedicament, medicament } from "./newMedicamentFun";

function NewMedicament() {
  return (
    <div>
      <div className="flex flex-col">
        <SectionTitle title="new Medicament" />
        <div className="flex justify-center">
          <MedicamentForm medicament={medicament} submitFun={addMedicament} />
        </div>
      </div>
    </div>
  );
}

export default NewMedicament;
