import TextEditor from "./TextEditor";
import { Btn, CheckBox } from "components";
import { useEffect, useState } from "react";
import { Notify } from "utils";
import { useAuth } from "hooks";
import LeftList from "./LeftList";
import { Input } from "@/components/ui/input";
function CmptRnd({ consultationId, patientId }) {
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(false);
  const auth = useAuth();
  const [title, setTitle] = useState(null);
  const [savedCmptRnd, setSavedCmptRnd] = useState([]);

  const getSavedCmptRnd = async () => {
    const res = await fetch("/api/compteRendu", {
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
  const handleCreateCmptRnd = () => {
    if (!value) {
      Notify({ type: "error", message: "Veuillez remplir le champ" });
    } else {
      const createCmptRnd = async () => {
        if (checked && !title) {
          return Notify({
            type: "error",
            message: "Veuillez remplir le champ du titre",
          });
        }
        const res = await fetch("/api/compteRendu", {
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
          setTitle("");
          setValue("");
          getSavedCmptRnd();
          setChecked(false);
          Notify({
            type: "success",
            message: "Compte rendu ajouté avec succès",
            pos: "top-center",
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

  useEffect(() => {
    getSavedCmptRnd();
  }, []);
  return (
    <>
      <div className="flex gap-5 px-5 ">
        <LeftList
          setValue={setValue}
          savedCmptRnd={savedCmptRnd}
          setSavedCmptRnd={setSavedCmptRnd}
        />
        <div className="bg-white   text-black">
          <TextEditor value={value} setValue={setValue} />
        </div>
      </div>
      <div className="flex justify-end mt-4 mr-10 gap-5">
        {checked && (
          <Input
            type="text"
            placeholder="Nom du modèle"
            className="border border-gray-300 rounded-md p-2 w-52"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        <CheckBox
          label={"Enregistrez ce modèle"}
          description={"Enregistrer ce modèle pour une utilisation ultérieure"}
          setChecked={setChecked}
          checked={checked}
        />
        <Btn
          text="Enregistrer "
          btnFun={() => {
            handleCreateCmptRnd();
            // window.print();
          }}
        />
      </div>
    </>
  );
}

export default CmptRnd;
