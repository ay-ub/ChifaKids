import { SectionTitle, SearchInput, Btn, Table } from "components";
import { useEffect, useState } from "react";
import { getMedicament, mapMedicament } from "./medicamentFun";

const tableHeader = ["N°", "Designation", "Forme", "Dosage", "Action"];
function Medicament() {
  const [medicaments, setMedicaments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMedicament(setMedicaments);
  }, []);

  const medicamentList = mapMedicament(medicaments, search, setMedicaments);
  return (
    <div className="medicament ">
      <div className="flex items-center justify-between ">
        <SectionTitle title="médicament" />
        <div className="flex items-center gap-3">
          {medicaments.length > 0 && (
            <SearchInput setSearch={setSearch} search={search} />
          )}
          <Btn path="/dashboard/new-medicament" text="Ajouter" />
        </div>
      </div>
      <Table
        data={medicaments}
        dataList={medicamentList}
        headers={tableHeader}
      />
    </div>
  );
}

export default Medicament;
