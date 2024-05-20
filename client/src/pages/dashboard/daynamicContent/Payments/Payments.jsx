import { SectionTitle, SubTitle } from "components";
import { set, useForm } from "react-hook-form";
import { FaBriefcaseMedical, FaSackDollar } from "assets/icon";
import { useEffect, useState } from "react";
import PaymentForm from "./PeymentForm";
import OperationList from "./OperationList";
import { Notify } from "utils";
import { useParams } from "react-router-dom";

function Payments() {
  const { id, detteValue } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [RestPrice, setRestPrice] = useState(0);
  const [VersementPrice, setVersementPrice] = useState(0);
  const [paymentAct, setPaymentAct] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      previousDebts: detteValue,
      leftToPay: RestPrice,
      versement: 0,
    },
  });

  useEffect(() => {}, [VersementPrice, totalPrice]);

  // useEffect(() => {
  //   setRestPrice(() => {
  //     return (
  //       parseFloat(
  //         parseFloat(totalPrice) +
  //           parseFloat(detteValue) -
  //           parseFloat(VersementPrice)
  //       ) || parseFloat(totalPrice) + parseFloat(detteValue)
  //     );
  //   });
  // }, [VersementPrice, totalPrice]);

  const onSubmit = async (data) => {
    console.log({
      patientId: id,
      receivedAmount: VersementPrice,
      paymentMethod: "CASH",
      paymentAct,
    });
    const response = await fetch("/api/payment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId: id,
        receivedAmount: VersementPrice,
        paymentMethod: "CASH",
        actsData: paymentAct,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
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
              setPaymentAct={setPaymentAct}
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
            detteValue={detteValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Payments;
