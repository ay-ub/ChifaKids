import { useForm } from "react-hook-form";
import { InputError } from "components";
import { useParams } from "react-router-dom";
import { Notify } from "utils";

function ConsultationForm() {
  const { patientId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          patientId,
          doctorId: 1,
        }),
      });
      const resData = await res.json();
      if (resData.status === "success") {
        Notify({ type: "success", message: "Consultation ajoutée." });
      } else {
        Notify({
          type: "error",
          message: "Impossible d'ajouter consultation.",
        });
      }
    } catch (error) {
      Notify({
        type: "error",
        message: "Impossible d'ajouter consultation.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        className="form w-[500px] flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-group flex-1">
          <label htmlFor="motif">Motif de consultation: </label>
          <input
            type="text"
            id="motif"
            placeholder="Entrez Motif de consultation :"
            {...register("motif", {
              required: {
                value: true,
                message: "le motif est nécessaire",
              },
            })}
            className={`${errors.motif ? "inValid" : null}`}
          />
          {<InputError error={errors.motif} />}
        </div>
        <div className="input-group flex-1">
          <label htmlFor="etat">Etat general :</label>
          <input
            type="text"
            id="etat"
            placeholder="Entrer l'etat general :"
            {...register("generalCondition", {
              required: {
                value: true,
                message: "l'etat general est nécessaire",
              },
            })}
            className={`${errors.etat ? "inValid" : null}`}
          />
          {<InputError error={errors.etat} />}
        </div>
        <div className="flex items-center gap-4">
          <div className="input-group flex-1">
            <label htmlFor="taille">taille :</label>
            <input
              type="text"
              id="taille"
              placeholder="Entrer le taille :"
              {...register("height", {
                required: { value: true, message: "taille est nécessaire" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "valeur incorrecte",
                },
              })}
              className={`${errors.height ? "inValid" : null}`}
            />
            {<InputError error={errors.height} />}
          </div>
          <div className="input-group flex-1">
            <label htmlFor="poids">poids :</label>
            <input
              type="text"
              id="poids"
              placeholder="Entrer le poids :"
              {...register("weight", {
                required: { value: true, message: "poids est nécessaire" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "valeur incorrecte",
                },
              })}
              className={`${errors.weight ? "inValid" : null}`}
            />
            {<InputError error={errors.weight} />}
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          <button type="submit" className="btn bg-[#8b63e9]">
            Ajouter consultation
          </button>
          <button type="reset" className="btn bg-[#8b63e9] ">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConsultationForm;
