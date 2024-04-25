import { useAuth } from "hooks";

function CertificatModel({ patientData }) {
  const auth = useAuth();
  return (
    <div className=" flex items-center justify-center h-[400px]">
      <div className="CertificatModel bg-white text-black p-5 rounded-md w-[800px] pb-20">
        <h1 className="text-center text-xl mb-5">
          Je soussigné(e){" "}
          <span className="font-bold">
            Dr. {`${auth.user.firstName} ${auth.user.lastName}`}{" "}
          </span>
          Certifie avoir examinera
        </h1>
        <div className="model-content flex flex-col gap-3 pl-6">
          <p className="flex gap-32">
            <span>
              Le (la) Nommé(e){" "}
              {`${patientData.firstName} ${patientData.lastName} `}
            </span>
            <span>Né(e) le {patientData.dateOfBirth}</span>
          </p>
          <p>Déclare que son état de santé nécessite :</p>
          <p>
            un arrêt de travail de <span>20</span> jour(s), à compter du{" "}
            <span className="underline">{new Date().toLocaleDateString()}</span>
          </p>
          <p>
            Une prolongation d&lsquo;arrêt de travail de
            <span> 15 </span> jour(s), à compter du{" "}
            <span>{new Date().toLocaleDateString()}</span>
          </p>
          <p>
            Une reprise de travail à compter du{" "}
            <span>{new Date().toLocaleDateString()} </span>
            Souf complication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CertificatModel;
