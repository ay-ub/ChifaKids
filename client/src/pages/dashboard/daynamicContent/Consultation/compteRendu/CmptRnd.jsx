import TextEditor from "./TextEditor";

import { Btn, CheckBox } from "components";
import { useState } from "react";
import { Notify } from "utils";
import { useAuth } from "hooks";
import LeftList from "./LeftList";

function CmptRnd({ consultationId, patientId }) {
  const [value, setValue] = useState();
  const [checked, setChecked] = useState(false); // [1
  const auth = useAuth();

  const onSbmit = () => {
    if (!value) {
      Notify({ type: "error", message: "Veuillez remplir le champ" });
    } else {
      const createCmptRnd = async () => {
        const res = await fetch("http://localhost:3000/compteRendu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            consultationId,
            commentaire: value,
            patientId,
            doctorId: auth.user.id,
            saveAsModel: checked,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          Notify({
            type: "success",
            message: "Compte rendu ajouté avec succès",
          });
        } else {
          Notify({
            type: "error",
            message: "Impossible d'ajouter le compte rendu",
          });
        }
      };
      createCmptRnd();
    }
  };

  return (
    <>
      <div className="flex gap-5 px-5 ">
        <LeftList />
        <div className="bg-white   text-black">
          <TextEditor value={value} setValue={setValue} />
        </div>
      </div>
      <div className="flex justify-end mt-4 mr-10 gap-5">
        <CheckBox
          label={"Enregistrez ce modèle"}
          description={
            "Sélectionnez pour enregistrer le modèle de compte rendu"
          }
          setChecked={setChecked}
        />
        <Btn
          text="Enregistrer "
          btnFun={() => {
            onSbmit();
            // window.print();
          }}
        />
      </div>
    </>
  );
}

export default CmptRnd;
