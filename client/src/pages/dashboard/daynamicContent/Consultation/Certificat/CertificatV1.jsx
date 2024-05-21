import { calculateAge } from "utils";
import { useAuth } from "hooks";

function OrdonnanceModel({ patientData, selectedDate }) {
  const auth = useAuth();
  return (
    <div className="ordonnanceDocument hidden">
      <div className=" bg-white text-black p-5 pb-10 relative flex flex-col gap-5 justify-between h-screen">
        <div>
          <div className="ordonnanceTitle text-xl p-3 rounded-xl border-2 flex items-center justify-center flex-col ">
            <p className="text-center">
              العيادة الطبية &quot; الرجاء &quot; المختصة في طب و انعاش الاطفال
            </p>
            <p className="text-center">
              Cabinet Médicale « RADJAA » Spécialisée en Pédiatrie
            </p>
          </div>
          <div className="ordonnanceHeader flex justify-between px-10 py-6">
            <div className="ordonnanceHeaderLeft">
              <p>Nom: {patientData.firstName}</p>
              <p>Prénom: {patientData.lastName}</p>
              <p>Age: {calculateAge(new Date(), patientData.dateOfBirth)}</p>
              <p>Date:{new Date().toLocaleDateString()}</p>
            </div>
            <div className="ordonnanceHeaderRight">
              <p>Doctor:......................................</p>
              <p>Spécialité:.................................</p>
              <p>Adresse:....................................</p>
              <p>Tél:.............................................</p>
            </div>
          </div>
          <div className="text-2xl uppercase text-center font-bold italic text-blue-500">
            Certificat medical
          </div>
          <div className="traitmentDetails p-3 text-center my-10">
            je soussigné Dr, {auth.user.lastName} , certifie avoir <br />
            examiné (e) ce jour le (a) sus nomme(é) <br /> et atteste que son
            état de santé nécessite <br /> un arrêt de travail du{" "}
            {selectedDate.from}
            au {selectedDate.to} .
          </div>
        </div>
        <div>
          <div className="h-[2px] bg-blue-500 w-full"></div>
          <div className="flex justify-between p-2 pb-0">
            <p className="text-center text-sm">
              Tél: 0554 34 00 63 - 0659 62 05 20
            </p>
            <p className="text-center text-sm">
              . حي السلام (البقعة) بجانب البريد و المواصلات
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdonnanceModel;
