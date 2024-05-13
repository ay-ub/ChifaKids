import { SectionTitle, SubTitle } from "components";
import { useForm } from "react-hook-form";
import { FaBriefcaseMedical, FaSackDollar } from "assets/icon";
import { useEffect, useState } from "react";
import PaymentForm from "./PeymentForm";
import OperationList from "./OperationList";

function Payments() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [RestPrice, setRestPrice] = useState(0);
  const [VersementPrice, setVersementPrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [operationList, setOperationList] = useState([]);

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //
    // },
  });

  useEffect(() => {
    setRestPrice(() => totalPrice - VersementPrice);
  }, [VersementPrice, totalPrice]);

  return (
    <div className="payment">
      <SectionTitle title="Règlement" />
      <div className="paymentsContent mt-4 p-4 flex items-center gap-7 flex-wrap">
        <div className="acts flex-1 bg-lightDark rounded-md h-[550px]">
          <div className="displayActs">
            <SubTitle title={"Actes Medicaux"} icon={<FaBriefcaseMedical />} />
            <OperationList
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          </div>
        </div>
        <div className="calcul flex-1 bg-lightDark  rounded-md h-[550px]">
          <SubTitle title={"Payments"} icon={<FaSackDollar />} />

          <PaymentForm
            totalPrice={totalPrice}
            RestPrice={RestPrice}
            register={register}
            errors={errors}
            setVersementPrice={setVersementPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default Payments;
