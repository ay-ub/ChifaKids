import { SectionTitle } from "components";
import { useForm } from "react-hook-form";
import { FaBriefcaseMedical, FaSackDollar } from "assets/icon";
import { useState } from "react";
import SelectOp from "./SelectOp";
import SubTitile from "./SubTitile";
import PaymentForm from "./PeymentForm";
import OperationList from "./OperationList";

function Payments() {
  const [totalPrice, setTotalPrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [operationList, setOperationList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //
    // },
  });

  return (
    <div className="payment">
      <SectionTitle title="Règlement" />
      <div className="paymentsContent mt-4 p-4 flex items-center gap-7 flex-wrap">
        <div className="acts flex-1 bg-lightDark rounded-md h-[550px]">
          <div className="displayActs">
            <SubTitile title={"Actes Medicaux"} icon={<FaBriefcaseMedical />} />
            <SelectOp
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              setOperationList={setOperationList}
              operationList={operationList}
            />
            <OperationList
              operationList={operationList}
              totalPrice={totalPrice}
            />
          </div>
        </div>
        <div className="calcul flex-1 bg-lightDark  rounded-md h-[550px]">
          <SubTitile title={"Payments"} icon={<FaSackDollar />} />
          <PaymentForm
            totalPrice={totalPrice}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}

export default Payments;
