import { useState } from "react";
import { useEffect } from "react";
import { Notify } from "utils";
import { Alert } from "components";
import { AiOutlineDelete } from "assets/icon";
function DisplayRndv({ patientId }) {
  const [rndv, setRndv] = useState(); //[1
  const getRndv = async () => {
    const res = await fetch(`/api/appointment/${patientId}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data.data[0]);
    if (data.status === "success" && data.data[0]) {
      setRndv(data.data);
    }
  };

  useEffect(() => {
    getRndv();
  }, []);

  const deleteRndv = async (id) => {
    try {
      const res = await fetch(`/api/appointment/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        Notify({ type: "success", message: "Le rendez-vous a été supprimé." });
        getRndv();
      } else {
        Notify({
          type: "error",
          message: "Impossible de supprimer le rendez-vous.",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible de supprimer le rendez-vous.",
      });
    }
  };
  return (
    <ul className="flex flex-col gap-2">
      {rndv ? (
        rndv.map((rndv) => (
          <li
            key={rndv.id}
            className="flex gap-3 items-center border rounded-md select-none bg-ph p-2"
          >
            <span className="flex-1 flex justify-center  ">{rndv.date}</span>
            <span className="flex-1 flex justify-center ">{rndv.time}</span>
            <Alert
              title="Voulez-vous vraiment supprimer ce rendez-vous?"
              btnFun={() => {
                deleteRndv(rndv.id);
              }}
              description="Cette action ne peut pas être annulée. "
              confirmBtn="Oui, Supprimer"
            >
              <span className="text-red-400 select-none text-xl">
                <AiOutlineDelete />
              </span>
            </Alert>
          </li>
        ))
      ) : (
        <p className="text-center">Aucun rendez-vous</p>
      )}
    </ul>
  );
}

export default DisplayRndv;
