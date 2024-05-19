import { SectionTitle, SubTitle } from "components";
import { useForm } from "react-hook-form";
import { FaBriefcaseMedical, FaSackDollar } from "assets/icon";
import { useEffect, useState } from "react";
import PaymentForm from "./PeymentForm";
import OperationList from "./OperationList";
import { Notify } from "utils";

function Payments() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [RestPrice, setRestPrice] = useState(0);
  const [VersementPrice, setVersementPrice] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amountToBePaid: totalPrice,
      previousDebts: 0,
      leftToPay: RestPrice,
      versement: VersementPrice,
    },
  });

  useEffect(() => {
    if (totalPrice > 0) {
      setRestPrice(() => totalPrice - VersementPrice);
    } else {
      setRestPrice(0);
    }
  }, [VersementPrice, totalPrice]);

  const onSubmit = async (data) => {
    console.log({ ...data, VersementPrice });
    if (VersementPrice == 0) {
      return Notify({
        type: "error",
        message: "Le versement doit être supérieur à 0",
      });
    }
    const response = await fetch("/api/payment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId: 1,
        receivedAmount: VersementPrice,
        paymentMethod: "CASH",
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "success") {
      Notify({
        type: "success",
        message: "Versement effectué avec succès",
      });
    } else {
      Notify({
        type: "error",
        message: responseData.message || "Erreur lors du versement",
      });
    }
    setVersementPrice(0);
    reset();
  };
  return (
    <div className="payment">
      <SectionTitle title="Règlement" />
      <div className="paymentsContent mt-4 p-4 flex items-center gap-7 flex-wrap">
        <div className="acts flex-1 bg-lightDark rounded-md h-[550px]">
          <div className="displayActs">
            <SubTitle title={"Actes Médicaux"} icon={<FaBriefcaseMedical />} />
            <OperationList
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          </div>
        </div>
        <div className="calcul flex-1 bg-lightDark  rounded-md h-[550px]">
          <SubTitle title={"Règlement"} icon={<FaSackDollar />} />

          <PaymentForm
            totalPrice={totalPrice}
            RestPrice={RestPrice}
            register={register}
            errors={errors}
            setVersementPrice={setVersementPrice}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Payments;
