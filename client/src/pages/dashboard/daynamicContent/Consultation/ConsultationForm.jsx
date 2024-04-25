import { useForm } from "react-hook-form";
import { InputError } from "components";
import { useParams } from "react-router-dom";
import { Notify } from "utils";
import { useAuth } from "hooks";

function ConsultationForm({ setConsultationId, setConsultationData }) {
  const auth = useAuth();
  const { patientId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      if (!data) {
        Notify({
          type: "error",
          message: "Impossible d'ajouter consultation.",
        });
        return;
      }

      const res = await fetch("http://localhost:3000/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          patientId,
          doctorId: auth.user.id,
        }),
      });
      const resData = await res.json();
      console.log(resData);
      if (resData.status === "success") {
        setConsultationId(resData.data.id);
        Notify({ type: "success", message: "Consultation ajoutée." });
        setConsultationData((prev) => [...prev, resData.data]);
      } else {
        Notify({
          type: "error",
          message: resData.message,
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
    <form
      className="form w-full h-[485px] mt-0  overflow-y-auto px-5 py-2 rounded-md flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-5 flex-wrap">
        <div className="flex-1 min-w-[400px] max-w-[500px] flex flex-col">
          <div className="input-group flex-1">
            <label htmlFor="motif">Motif de consultation: </label>
            <input
              type="text"
              id="motif"
              placeholder="Entrez Motif de consultation :"
              {...register("motif")}
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
              {...register("generalCondition")}
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
                {...register("height")}
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
                {...register("weight")}
                className={`${errors.weight ? "inValid" : null}`}
              />
              {<InputError error={errors.weight} />}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[400px] max-w-[500px] flex flex-col">
          <div className="input-group flex-1">
            <label htmlFor="urogénital">urogénital: </label>
            <input
              type="text"
              id="urogénital"
              placeholder="remarque :"
              {...register("urogenital")}
            />
          </div>
          <div className="input-group flex-1">
            <label htmlFor="genital">Génital :</label>
            <input
              type="text"
              id="genital"
              placeholder="remarque :"
              {...register("genital")}
            />
          </div>
          <div className="input-group flex-1">
            <label htmlFor="abdominal">abdominal :</label>
            <input
              type="text"
              id="abdominal"
              placeholder="remarque :"
              {...register("abdominal")}
            />
          </div>
        </div>
        <div className="flex-1 min-w-[400px] max-w-[500px] flex flex-col">
          <div className="input-group flex-1">
            <label htmlFor="ultrasound">echographie: </label>
            <input
              type="text"
              id="ultrasound"
              placeholder="remarque echographie:"
              {...register("ultrasound")}
            />
          </div>
          <div className="input-group flex-1">
            <label htmlFor="tdm">tdm :</label>
            <input
              type="text"
              id="tdm"
              placeholder="remarque :"
              {...register("tdm")}
            />
          </div>
          <div className="input-group flex-1">
            <label htmlFor="irm">irm :</label>
            <input
              type="text"
              id="irm"
              placeholder="remarque :"
              {...register("irm")}
            />
          </div>
        </div>
        <div className="flex-1 min-w-[400px] flex gap-5">
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="input-group flex-1">
                <label htmlFor="glycemie">glycemie: </label>
                <input
                  type="text"
                  id="glycemie"
                  placeholder="remarque glycemie:"
                  {...register("glycemie", {
                    pattern: {
                      value: /^[0-9]+$|^[0-9]+[.][0-9]+$/,
                      message: "valeur incorrecte",
                    },
                  })}
                  className={`${errors.glycemie ? "inValid" : null}`}
                />
                {<InputError error={errors.glycemie} />}
              </div>
              <div className="input-group flex-1">
                <label htmlFor="crp">crp :</label>
                <input
                  type="text"
                  id="crp"
                  placeholder="remarque crp:"
                  {...register("crp", {
                    pattern: {
                      value: /^[0-9]+$|^[0-9]+[.][0-9]+$/,
                      message: "valeur incorrecte",
                    },
                  })}
                  className={`${errors.crp ? "inValid" : null}`}
                />
                {<InputError error={errors.crp} />}
              </div>
            </div>
            <div className="flex gap-5">
              <div className="input-group flex-1">
                <label htmlFor="urea">urée :</label>
                <input
                  type="text"
                  id="urea"
                  placeholder="remarque urée:"
                  {...register("urea", {
                    pattern: {
                      value: /^[0-9]+$|^[0-9]+[.][0-9]+$/,
                      message: "valeur incorrecte",
                    },
                  })}
                  className={`${errors.urea ? "inValid" : null}`}
                />
                {<InputError error={errors.urea} />}
              </div>
              <div className="input-group flex-1">
                <label htmlFor="creatine">creatine :</label>
                <input
                  type="text"
                  id="creatine"
                  placeholder="remarque creatine:"
                  {...register("creatine", {
                    pattern: {
                      value: /^[0-9]+$|^[0-9]+[.][0-9]+$/,
                      message: "valeur incorrecte",
                    },
                  })}
                  className={`${errors.creatine ? "inValid" : null}`}
                />
                {<InputError error={errors.creatine} />}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="input-group flex-1">
              <label htmlFor="fns">fns :</label>
              <input
                type="text"
                id="fns"
                placeholder="remarque fns:"
                {...register("fns")}
              />
            </div>

            <div className="input-group flex-1">
              <label htmlFor="biologyOther">Autres :</label>
              <input
                type="text"
                id="biologyOther"
                placeholder="observation :"
                {...register("biologyOther")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 my-5 w-[500px]">
        <button type="submit" className="btn bg-[#8b63e9]">
          Ajouter consultation
        </button>
        <button type="reset" className="btn bg-[#8b63e9] ">
          Reset
        </button>
      </div>
    </form>
  );
}

export default ConsultationForm;
