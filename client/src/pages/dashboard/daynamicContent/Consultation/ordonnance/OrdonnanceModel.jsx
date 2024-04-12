import { useEffect } from "react";
import { calculateAge } from "utils";

function OrdonnanceModel({ traitmentDetails, patientData }) {
  useEffect(() => {
    console.log("traitmentDetails: ", patientData);
  }, []);

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
              <p>Age: {calculateAge(patientData.dateOfBirth)}</p>
              <p>Date:{new Date().toLocaleDateString()}</p>
            </div>
            <div className="ordonnanceHeaderRight">
              <p>Doctor:......................................</p>
              <p>Spécialité:.................................</p>
              <p>Adresse:....................................</p>
              <p>Tél:.............................................</p>
            </div>
          </div>
          <div className="text-2xl text-center font-bold italic text-blue-500">
            Ordonnance
          </div>
          <div className="traitmentDetails p-3 text-center my-10">
            {traitmentDetails.map((item, index) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex items-center gap-x-3">
                  <p>{index + 1}.</p>
                  <p>{item.name}</p>
                  <p>
                    {item.dosage} {item.dosageUnit}
                  </p>
                </div>
                <p>{item.duration}</p>
                <div className="flex items-center gap-x-3">
                  <p>{item.frequency} fois/jour</p>
                  <p>{item.eatingTime} repas</p>
                </div>
                {item.notes && <p>{item.notes}</p>}
              </div>
            ))}
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
