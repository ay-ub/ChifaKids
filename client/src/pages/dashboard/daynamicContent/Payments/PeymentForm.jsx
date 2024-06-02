import { InputError } from "components";
import { useEffect } from "react";
function PeymentForm({
  totalPrice,
  RestPrice,
  setVersementPrice,
  register,
  errors,
  handleSubmit,
  onSubmit,
  detteValue,
}) {
  return (
    <div className="py-4  ">
      <form
        className="flex flex-col  gap-y-1 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-group flex-1 mb-5 px-8">
          <label htmlFor="previousdebts" className="text-nowrap">
            Dettes antérieures :
          </label>
          <input
            type="number"
            min={0}
            id="previousdebts"
            placeholder="0000 DA"
            readOnly
            {...register("previousDebts", {
              required: {
                value: true,
                message: "dettes antérieures sont nécessaire",
              },
            })}
            className={`${errors.previousDebts ? "inValid" : null}`}
          />
        </div>
        <div className="input-group flex-1 px-8">
          <label htmlFor="amounttobepaid" className="text-nowrap">
            Montant à payer (total + dette) :
          </label>
          <input
            type="number"
            min={0}
            id="amounttobepaid"
            placeholder="0000 DA"
            value={parseFloat(totalPrice) + parseFloat(detteValue)}
            readOnly
            {...register("amountToBePaid", {
              required: {
                value: true,
                message: "le montant à payer est nécessaire",
              },
            })}
            className={`${errors.amountToBePaid ? "inValid" : null}`}
          />
          {<InputError error={errors.amountToBePaid} />}
        </div>
        <div className="input-group flex-1 px-8">
          <label htmlFor="payment" className="text-nowrap">
            Versement:
          </label>
          <input
            type="number"
            id="payment"
            placeholder="0000 DA"
            onChange={(e) => setVersementPrice(e.target.value)}
            autoComplete="off"
            min="0"
          />
        </div>
        <div className="input-group flex-1 px-8 mt-6">
          <label htmlFor="leftToPay" className="text-nowrap">
            Rest à payer :
          </label>
          <input
            type="number"
            readOnly
            id="leftToPay"
            placeholder="0000 DA"
            min="0"
            value={RestPrice}
            {...register("leftToPay", {
              required: {
                value: true,
                message: "left To Pay is required",
              },
              max: {
                value: parseFloat(totalPrice) + parseFloat(detteValue),
                message: "le montant à payer est supérieur à la dette",
              },
            })}
            className={`${errors.leftToPay ? "inValid" : null}`}
          />
          {<InputError error={errors.leftToPay} />}
        </div>
        <div className=" flex gap-x-2 mt-14">
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
