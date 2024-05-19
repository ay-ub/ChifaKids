import { PopUp } from "components";
import { FaBriefcaseMedical, MdGroups, FaBed, FaPlusCircle } from "assets/icon";
import { Notify } from "utils";
import { useState, useEffect } from "react";
import EntList from "./EntList";
import { useParams } from "react-router-dom";
function Entecedent() {
  const [entecedentData, setEntecedentData] = useState([]);
  const { patientId } = useParams();
  const [tmp, setTemp] = useState("");
  const [entecedentObg, setEntecedentObg] = useState({
    name: "",
    type: "",
    patientId,
  });
  // GET antecedents
  useEffect(() => {
    const getAntecedents = async () => {
      const allAntecedents = await fetch(`/api/antecedent`);
      const newEntecedent = await allAntecedents.json();
      if (newEntecedent.status === "success") {
        setEntecedentData(newEntecedent.data);
      }
    };
    getAntecedents();
  }, []);

  const createEntecedent = async (event) => {
    event.preventDefault();
    try {
      if (entecedentObg.name === "") {
        Notify({
          type: "error",
          message: "Veuillez remplir le champ.",
        });
        return;
      }
      const result = await fetch("/api/antecedent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entecedentObg),
      });
      const newEntecedent = await result.json();
      console.log("new enticedent = ", newEntecedent);
      if (newEntecedent.status === "success") {
        Notify({
          type: "success",
          message: "Entecedent ajouté .",
        });
        setEntecedentData((prevData) => {
          return [...prevData, newEntecedent.data];
        });
      } else {
        Notify({
          type: "error",
          message: newEntecedent.massage,
        });
      }
    } catch (error) {
      Notify({ type: "error", message: "Impossible d’ajouter L'entecedent." });
    }
  };
  const deleteEntecedent = async (id) => {
    try {
      const deleteEntecedent = await fetch(`/api/antecedent/${id}`, {
        method: "DELETE",
      });
      const deletedEntecedent = await deleteEntecedent.json();
      if (deletedEntecedent.status === "success") {
        Notify({
          type: "success",
          message: "Entecedent supprimé .",
        });
        setEntecedentData((prevData) => {
          return prevData.filter((entecedent) => entecedent.id !== id);
        });
      } else {
        Notify({
          type: "error",
          message: "Impossible de supprimer L'entecedent.",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible de supprimer L'entecedent.",
      });
    }
  };

  const UpdateEntecedent = async (updatedEntecedent, entecedentId) => {
    try {
      const updateResult = await fetch(`/api/antecedent/${entecedentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEntecedent),
      });
      const finalResult = await updateResult.json();
      if (finalResult.status === "success") {
        Notify({
          type: "success",
          message: "Entecedent modifié .",
        });
      } else {
        Notify({
          type: "error",
          message: "Impossible de modifier L'entecedent.",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible de mettre à jour L'entecedent.",
      });
    }
  };

  const handleKeyDown = (event, entecedent) => {
    if (event.key === "Enter") {
      event.target.contentEditable = false;
      event.target.blur();
      const newName = event.target.innerText;
      if (newName === entecedent.name) return;
      if (newName === "") {
        Notify({
          type: "error",
          message: "Veuillez remplir le champ.",
        });
        event.target.innerText = tmp;
        return;
      }
      const updatedEntecedent = {
        ...entecedent,
        name: newName,
      };
      UpdateEntecedent(updatedEntecedent, entecedent.id);
    }
  };

  return (
    <div className="mt-[-20px] p-4 flex gap-4 flex-wrap">
      <div className="flex-1 bg-lightDark  rounded-md h-[480px]">
        <div className="flex items-center  text-2xl bg-p rounded-md  p-2 text-white select-none">
          <span className=" flex-1 flex gap-2 items-center justify-center">
            <span className="icon">
              <MdGroups />
            </span>
            <span>Familiaux</span>
          </span>
          <PopUp
            header={<FaPlusCircle />}
            body={
              <form onSubmit={createEntecedent}>
                <div className="input-group mb-3">
                  <label htmlFor="Antécédents">antécédents familiaux :</label>
                  <input
                    type="text"
                    id="Antécédents"
                    placeholder="Antécédents Familiaux:"
                    autoComplete="off"
                    value={entecedentData.name}
                    onChange={(e) => {
                      setEntecedentObg({
                        ...entecedentObg,
                        name: e.target.value,
                        type: "Familiaux",
                      });
                    }}
                  />
                </div>
                <button type="submit" className="sign bg-p bg-ph">
                  Ajouter
                </button>
              </form>
            }
          />
        </div>

        <EntList
          entecedentData={entecedentData}
          handleKeyDown={handleKeyDown}
          deleteEntecedent={deleteEntecedent}
          entecedentType="Familiaux"
          setTemp={setTemp}
        />
      </div>
      <div className="flex-1 bg-lightDark  rounded-md h-[480px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <FaBriefcaseMedical />
            </span>
            <span>Médicaux</span>
          </span>
          <PopUp
            header={<FaPlusCircle />}
            body={
              <form onSubmit={createEntecedent}>
                <div className="input-group mb-3">
                  <label htmlFor="Antécédents">antécédents Médicaux :</label>
                  <input
                    type="text"
                    id="Antécédents"
                    placeholder="Antécédents Médicaux:"
                    autoComplete="off"
                    value={entecedentData.name}
                    onChange={(e) => {
                      setEntecedentObg({
                        ...entecedentObg,
                        name: e.target.value,
                        type: "Medicaux",
                      });
                    }}
                  />
                </div>
                <button type="submit" className="sign bg-p bg-ph">
                  Ajouter
                </button>
              </form>
            }
          />
        </div>
        <EntList
          entecedentData={entecedentData}
          handleKeyDown={handleKeyDown}
          deleteEntecedent={deleteEntecedent}
          entecedentType="Medicaux"
          setTemp={setTemp}
        />
      </div>
      <div className="flex-1 bg-lightDark  rounded-md h-[480px]">
        <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
          <span className="flex flex-1 gap-2 items-center justify-center">
            <span className="icon">
              <FaBed />
            </span>
            <span>Chururgicaux</span>
          </span>
          <PopUp
            header={<FaPlusCircle />}
            body={
              <form onSubmit={createEntecedent}>
                <div className="input-group mb-3">
                  <label htmlFor="Antécédents">antécédent Chururgicaux :</label>
                  <input
                    type="text"
                    id="Antécédent"
                    placeholder="Antécédent chirurgical:"
                    autoComplete="off"
                    value={entecedentData.name}
                    onChange={(e) => {
                      setEntecedentObg({
                        ...entecedentObg,
                        name: e.target.value,
                        type: "Chururgicaux",
                      });
                    }}
                  />
                </div>
                <button type="submit" className="sign bg-p bg-ph">
                  Ajouter
                </button>
              </form>
            }
          />
        </div>

        <EntList
          entecedentData={entecedentData}
          handleKeyDown={handleKeyDown}
          deleteEntecedent={deleteEntecedent}
          entecedentType="Chururgicaux"
          setTemp={setTemp}
        />
      </div>
    </div>
  );
}

export default Entecedent;
