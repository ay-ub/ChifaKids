import TextEditor from "./TextEditor";

import { Btn, CheckBox } from "components";
import { useEffect, useState } from "react";
import { Notify } from "utils";
import { useAuth } from "hooks";
import LeftList from "./LeftList";

function CmptRnd({ consultationId, patientId }) {
  const [value, setValue] = useState();
  const [checked, setChecked] = useState(false); // [1
  const auth = useAuth();
  const [title, setTitle] = useState("");
  const [savedCmptRnd, setSavedCmptRnd] = useState([]);

  const getSavedCmptRnd = async () => {
    const res = await fetch("http://localhost:3000/compteRendu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") {
      setSavedCmptRnd(data.data);
    }
  };
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
            isSaved: checked,
            title: title,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          Notify({
            type: "success",
            message: "Compte rendu ajouté avec succès",
          });
          if (checked) {
            getSavedCmptRnd();
          }
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

  useEffect(() => {
    getSavedCmptRnd();
  }, []);
  return (
    <>
      <div className="flex gap-5 px-5 ">
        <LeftList setValue={setValue} savedCmptRnd={savedCmptRnd} />
        <div className="bg-white   text-black">
          <TextEditor value={value} setValue={setValue} />
        </div>
      </div>
      <div className="flex justify-end mt-4 mr-10 gap-5">
        <CheckBox
          label={"Enregistrez ce modèle"}
          description={"Enregistrer ce modèle pour une utilisation ultérieure"}
          setChecked={setChecked}
        />
        {checked && (
          <input
            type="text"
            placeholder="Nom du modèle"
            className="border border-gray-300 rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
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
