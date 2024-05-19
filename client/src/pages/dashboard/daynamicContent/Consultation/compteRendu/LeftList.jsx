import { motion } from "framer-motion";
import { CiCalendarDate, AiOutlineDelete } from "assets/icon";
import { Alert } from "components";
import { Notify } from "utils";
function LeftList({ setValue, savedCmptRnd, setSavedCmptRnd }) {
  const handleDelete = async (id) => {
    // delete savedCmptRnd
    try {
      const res = await fetch(`/api/compteRendu/saved/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        Notify({ type: "success", message: "Le compte rendu a été supprimé." });
        const newCmptRnd = savedCmptRnd.filter((item) => item.id !== id);
        setSavedCmptRnd(newCmptRnd);
      } else {
        Notify({
          type: "error",
          message: "Impossible de supprimer le compte rendu.",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible de supprimer le compte rendu.",
      });
    }
  };
  return (
    <div className="flex-1 bg-lightDark  rounded-md h-[420px]">
      <div className="flex items-center  text-2xl bg-p rounded-md rounded-b-none p-2 text-white select-none">
        <span className="flex flex-1 gap-2 items-center justify-center">
          <span className="icon">
            <CiCalendarDate />
          </span>
          <span>Compte Rendu Prêt</span>
        </span>
      </div>
      <ul className="p-2 h-[370px] overflow-y-auto overflow-x-hidden">
        {savedCmptRnd.length > 0 ? (
          savedCmptRnd.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={({ duration: 0.3 }, { delay: 0.1 })}
              className="flex items-start justify-between darkBg bg-ph p-2 rounded-sm mt-1 select-none hover:text-white"
            >
              <span
                className="flex-1 "
                onClick={() => setValue(item?.commentaire)}
              >
                {item.title}
              </span>
              <Alert
                title="Voulez-vous vraiment supprimer ce compte rendu ?"
                btnFun={() => {
                  handleDelete(item.id);
                }}
                description="Cette action ne peut pas être annulée. "
                confirmBtn="Oui, Supprimer"
              >
                <span className="text-red-400 select-none ">
                  <AiOutlineDelete className="text-2xl" />
                </span>
              </Alert>
            </motion.li>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Aucun compte rendu prêt
          </div>
        )}
      </ul>
    </div>
  );
}

export default LeftList;
