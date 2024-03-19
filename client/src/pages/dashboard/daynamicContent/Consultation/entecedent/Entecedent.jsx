import { SubTitle } from "components";
import { FaBriefcaseMedical, MdGroups, FaBed } from "assets/icon";

function Entecedent() {
  return (
    <div className="paymentsContent mt-[-20px] p-4 flex gap-4 flex-wrap">
      <div className="calcul flex-1 bg-lightDark  rounded-md h-[520px]">
        <SubTitle title="Familiaux" icon={<MdGroups />} btnTxt={"+"} />
        <div className="py-4 px-8 "></div>
      </div>
      <div className="calcul flex-1 bg-lightDark  rounded-md h-[520px]">
        <SubTitle title="Médicaux" icon={<FaBriefcaseMedical />} btnTxt={"+"} />
        <div className="py-4 px-8 "></div>
      </div>
      <div className="calcul flex-1 bg-lightDark  rounded-md h-[520px]">
        <SubTitle title="Chururgicaux" icon={<FaBed />} btnTxt={"+"} />
        <div className="py-4 px-8 "></div>
      </div>
    </div>
  );
}

export default Entecedent;
