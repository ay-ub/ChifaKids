import { InputError } from "components";
function PeymentForm({
  totalPrice,
  RestPrice,
  // setVersementPrice,
  register,
  errors,
}) {
  return (
    <div className="py-4 px-8 ">
      <form className="flex flex-col  gap-y-1 ">
        <div className="input-group flex-1  mb-5">
          <label htmlFor="previousdebts" className="text-nowrap">
            Dettes antérieures :
          </label>
          <input
            type="text"
            id="previousdebts"
            placeholder="0000 DA"
            {...register("previousDebts", {
              pattern: {
                value: /^[0-9]+$/,
                message: "valeur incorrecte",
              },
              required: {
                value: true,
                message: "dettes antérieures sont nécessaire",
              },
            })}
            className={`${errors.previousDebts ? "inValid" : null}`}
          />
        </div>
        <div className="input-group flex-1  ">
          <label htmlFor="amounttobepaid" className="text-nowrap">
            Montant à payer:
          </label>
          <input
            type="text"
            id="amounttobepaid"
            placeholder="0000 DA"
            value={totalPrice}
            readOnly
            {...register("amountToBePaid", {
              pattern: {
                value: /^[0-9]+$/,
                message: "valeur incorrecte",
              },
              required: {
                value: true,
                message: "le montant à payer est nécessaire",
              },
            })}
            className={`${errors.amountToBePaid ? "inValid" : null}`}
          />
          {<InputError error={errors.amountToBePaid} />}
        </div>
        <div className="input-group flex-1  ">
          <label htmlFor="payment" className="text-nowrap">
            Versement:
          </label>
          <input
            type="text"
            id="payment"
            placeholder="0000 DA"
            // onChange={(e) => setVersementPrice(e.target.value)}
            {...register("payment", {
              pattern: {
                value: /^[0-9]+$/,
                message: "valeur incorrecte",
              },
              required: {
                value: true,
                message: "Règlement est nécessaire",
              },
              // onChange: (e) => setVersementPrice(e.target.value),
            })}
            autoComplete="off"
            className={`${errors.payment ? "inValid" : null}`}
          />
          {<InputError error={errors.payment} />}
        </div>
        <div className="input-group flex-1  ">
          <label htmlFor="leftToPay" className="text-nowrap">
            Rest à payer:
          </label>
          <input
            type="text"
            id="leftToPay"
            placeholder="0000 DA"
            value={RestPrice}
            {...register("leftToPay", {
              pattern: {
                value: /^[0-9]+$/,
                message: "valeur incorrecte",
              },
              required: {
                value: true,
                message: "left To Pay is required",
              },
            })}
            className={`${errors.leftToPay ? "inValid" : null}`}
          />
          {<InputError error={errors.leftToPay} />}
        </div>
        <div className=" flex gap-x-2">
          <button
            type="submit"
            className="bg-primary w-full py-2 rounded-md text-white "
          >
            confirmer le paiement
          </button>
          <button
            type="reset"
            className="bg-background w-full py-2 rounded-md capitalize"
          >
            {`annuler l'opération`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PeymentForm;
