import { motion } from "framer-motion";
import { Alert } from "components";
import { AiOutlineDelete } from "assets/icon";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EntList({
  entecedentData,
  handleKeyDown,
  deleteEntecedent,
  entecedentType,
  setTemp,
}) {
  const { patientId } = useParams();
  const [patientAntecedents, setPatientAntecedents] = useState([]);
  useEffect(() => {
    const getPatientAntecedents = async () => {
      const antecedents = await fetch(
        `http://localhost:3000/antecedent/patient/${patientId}`
      );
      const patEntecedent = await antecedents.json();
      if (patEntecedent.status === "success") {
        const ids = [];
        patEntecedent.data.map((ant) => ids.push(ant.antecedentId));
        setPatientAntecedents(ids);
      }
    };
    getPatientAntecedents();
  }, [patientId]);
  const addAntecedentToPatient = async (antecedentId) => {
    try {
      if (antecedentId) {
        const result = await fetch(`http://localhost:3000/antecedent/patient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ antecedentId, patientId }),
        });
        const newAntecedent = await result.json();
        if (newAntecedent.status === "success") {
          setPatientAntecedents((prev) => [...prev, antecedentId]);
        }
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };
  const removeAntecedentFromPatient = async (antecedentId) => {
    try {
      const remove = await fetch(`http://localhost:3000/antecedent/patient`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ antecedentId, patientId }),
      });
      const removeAntecedent = await remove.json();
      if (removeAntecedent.status === "success") {
        setPatientAntecedents((prev) =>
          prev.filter((id) => id !== antecedentId)
        );
      }
    } catch (error) {
      console.log("error = ", error);
    }
  };

  return (
    <ul className="p-2 pb-0 h-[430px] overflow-y-auto overflow-x-hidden">
      {entecedentData
        .filter((entecedent) => {
          return entecedent.type === entecedentType;
        })
        .map(
          (entecedent, index) =>
            entecedent.name && (
              <motion.li
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                key={entecedent.id}
                className="flex items-start justify-between darkBg p-2 rounded-sm mt-1 select-none cursor-text"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="w-5 h-5"
                    checked={
                      patientAntecedents.find((id) => id === entecedent.id)
                        ? true
                        : false
                    }
                    onCheckedChange={(event) => {
                      if (event) {
                        addAntecedentToPatient(entecedent?.id);
                      } else {
                        removeAntecedentFromPatient(entecedent?.id);
                      }
                    }}
                  />

                  <span
                    className="text-[18px] flex-1"
                    onDoubleClick={(event) => {
                      setTemp(entecedent.name);
                      event.target.contentEditable = true;
                      event.target.focus();
                    }}
                    onKeyDown={(event) => handleKeyDown(event, entecedent)}
                    onBlur={(event) => (event.target.contentEditable = false)}
                  >
                    {entecedent.name}
                  </span>
                </div>
                <Alert
                  title="Voulez-vous vraiment supprimer ce entecedent ?"
                  btnFun={() => {
                    deleteEntecedent(entecedent.id);
                  }}
                  description="Cette action ne peut pas être annulée. "
                  confirmBtn="Oui, Supprimer"
                >
                  <span className="text-red-400 select-none text-2xl">
                    <AiOutlineDelete />
                  </span>
                </Alert>
              </motion.li>
            )
        )}
    </ul>
  );
}

export default EntList;
