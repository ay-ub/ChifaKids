// import LeftList from "./LeftList";
import TextEditor from "./TextEditor";
import { useState } from "react";
import { Alert } from "components";
import { motion } from "framer-motion";
import { CiCalendarDate, AiOutlineDelete } from "assets/icon";
import { useEffect } from "react";

function DisplayCmptRendi({ patientId, selectedDate }) {
  const [selected, setSelected] = useState();
  const [cmptRendiData, setCmptRendiData] = useState([]);
  const getCmptRendi = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/compteRendu/patient/${patientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedDate),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status == "success") {
        console.log(data.data);
        setCmptRendiData(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCmptRendi();
  }, [selectedDate]);

  const deleteCmptRendi = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/compteRendu/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.status == "success") {
        getCmptRendi();
        setSelected("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex gap-5 px-5 ">
        <div className="flex-1 bg-lightDark  rounded-md h-[420px]">
          <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
            <span className="flex flex-1 gap-2 items-center justify-center">
              <span className="icon">
                <CiCalendarDate />
              </span>
              <span>Compte Rendu</span>
            </span>
          </div>

          {cmptRendiData.length > 0 &&
            cmptRendiData.map((item, index) => {
              return (
                <ul key={index} className="px-2">
                  {item?.compteRendus &&
                    item.compteRendus.map((cmp, pos) => {
                      return (
                        <motion.li
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={({ duration: 0.3 }, { delay: 0.1 })}
                          key={pos}
                          onClick={() => setSelected(cmp.commentaire)}
                          className="flex items-center justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
                        >
                          <span className="flex-1">{cmp.date}</span>
                          <Alert
                            title="Voulez-vous vraiment supprimer ce compte rendu ?"
                            btnFun={() => {
                              deleteCmptRendi(cmp.id);
                            }}
                            description="Cette action ne peut pas être annulée. "
                            confirmBtn="Oui, Supprimer"
                          >
                            <span className="text-red-400 select-none text-xl">
                              <AiOutlineDelete />
                            </span>
                          </Alert>
                        </motion.li>
                      );
                    })}
                </ul>
              );
            })}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.1 })}
          className="bg-white   text-black"
        >
          {<TextEditor value={selected} setValue={setSelected} />}
        </motion.div>
      </div>
    </>
  );
}

export default DisplayCmptRendi;
