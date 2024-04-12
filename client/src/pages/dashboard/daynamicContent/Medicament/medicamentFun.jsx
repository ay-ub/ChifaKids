import { AiOutlineDelete, FiEdit } from "assets/icon";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Notify } from "utils";
import { Alert } from "components";

const handleDelete = async (id, medicaments, setMedicaments) => {
  // delete patient
  try {
    const res = await fetch(`http://localhost:3000/medicaments/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "success") {
      setMedicaments(medicaments.filter((medicament) => medicament.id !== id));
      Notify({ type: "success", message: "Le médicament a été supprimé." });
    } else {
      Notify({
        type: "error",
        message: "Impossible de supprimer le médicament.",
      });
    }
  } catch (error) {
    Notify({
      type: "error",
      message: "Impossible de supprimer le médicament.",
    });
  }
};

const mapMedicament = (medicaments, search, setMedicaments) => {
  return medicaments
    .filter(
      (medicament) =>
        search === "" ||
        medicament.name.toLowerCase().includes(search.toLowerCase()) ||
        medicament.type.toLowerCase().includes(search.toLowerCase()) ||
        medicament.dosage.toLowerCase().includes(search.toLowerCase())
    )
    .map((medicament, index) => {
      return (
        <motion.tr
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={({ duration: 0.4 }, { delay: 0.3 })}
          className="cursor-pointer "
          key={medicament.id}
        >
          <td className="select-none">{index + 1}</td>
          <td className="select-none">{medicament.name}</td>
          <td>{medicament.type}</td>
          <td>{`${medicament.dosage} ${medicament.dosageUnit}`}</td>
          <td className="action flex justify-center items-center gap-4">
            <Alert
              title="Vous êtes sûr de vouloir supprimer ce médicament !"
              btnFun={() => {
                handleDelete(medicament.id, medicaments, setMedicaments);
              }}
              description="Une fois supprimé, vous ne pourrez pas récupérer ce médicament ."
              confirmBtn="Oui, supprimer !"
              cancelBtn="Annuler"
            >
              <span className="text-red-400">
                <AiOutlineDelete />
              </span>
            </Alert>
            <Link
              to={`/dashboard/Edit-medicament/${medicament.id}`}
              className="text-[20px]"
            >
              <FiEdit />
            </Link>
          </td>
        </motion.tr>
      );
    });
};

export { mapMedicament };
