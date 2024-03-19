import { PopUp } from "components";
function SubTitle({ title, icon, btnTxt }) {
  return (
    <div
      className={`flex items-center ${
        btnTxt ? "justify-around" : "justify-center"
      }  text-2xl bg-p rounded-md p-2 text-white select-none`}
    >
      <span className="flex gap-2 items-center justify-center">
        <span className="icon">{icon}</span>
        <span>{title}</span>
      </span>
      {btnTxt && (
        <PopUp
          header={
            <span className="w-8 h-8 rounded-full bg-lightDark flex items-center justify-center cursor-pointer">
              {btnTxt}
            </span>
          }
          body={
            <div className="input-group">
              <label htmlFor="email">Maladie :</label>
              <input
                type="text"
                id="email"
                placeholder="Entrez le nom de la maladie"
                // {...register("email", {
                //   required: { value: true, message: "email est obligatoire" },
                //   pattern: {
                //     value: emailRegex,
                //     message: "Veuillez entrer un email valide",
                //   },
                // })}
                // className={`${errors.email ? "inValid" : null}`}
              />
              {/* {<InputError error={errors.email} />} */}
            </div>
          }
        />
      )}
    </div>
  );
}

export default SubTitle;
