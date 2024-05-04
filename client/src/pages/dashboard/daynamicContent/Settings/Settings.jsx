import { SectionTitle, Alert, ToolTip, Table } from "components";
import { Input } from "@/components/ui/input";
import { Notify } from "utils";
import { readFile } from "utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardModel } from "components";

function Settings() {
  const [selectedFile, setSelectedFile] = useState();
  const [gender, setGender] = useState("MALE");
  const [type, setType] = useState("HEIGHT");
  const handleUpdate = async () => {
    if (!selectedFile) {
      Notify({
        type: "error",
        message: "Sil vous plaît, sélectionnez un fichier",
      });
      return;
    }
    readFile(selectedFile, gender, type);
  };

  const tableHeader = ["N°", "Nom", "Prénom", "Email", "Rôle", "Actions"];
  const medicamentList = [];
  const medicaments = [
    {
      id: 1,
      nom: "Hadj Youcef",
      prenom: "Ayoub",
      email: "ayoubhadjyoucef@gmail.com",
      Role: "ADMIN",
    },
  ];
  return (
    <div>
      <SectionTitle title="Settings" />
      <div className="flex gap-5 mt-5 items-start  h-[570px]">
        <div className=" flex-1 flex flex-col gap-5 ">
          <div className="flex gap-5 ">
            <CardModel
              title={"Consultation"}
              description={"nombre Total de consultation "}
              nbr={"10"}
              // icon={"<FaStethoscope className={iconStyle} />"}
            />
            <CardModel
              title={"Consultation"}
              description={"nombre Total de consultation "}
              nbr={"10"}
              // icon={"<FaStethoscope className={iconStyle} />"}
            />
            <CardModel
              title={"Consultation"}
              description={"nombre Total de consultation "}
              nbr={"10"}
              // icon={"<FaStethoscope className={iconStyle} />"}
            />
          </div>
          <div className="border h-[420px] rounded-md px-4 py-2 ">
            <SectionTitle title="Utilisateurs" />
            <ul>
              <li className="flex gap-5 items-center py-2">
                <span className="text-center">N°</span>
                <span className="flex-1 text-center">Nom</span>
                <span className="flex-1 text-center">Prénom</span>
                <span className="flex-1 text-center">Email</span>
                <span className="flex-1 text-center">rôle</span>
                <span className="flex-1 text-center">Actions</span>
              </li>
              <div>
                {medicaments.map((medicament, index) => {
                  return (
                    <li className="flex gap-5 items-center py-2" key={index}>
                      <span className="text-center">{medicament.id}</span>
                      <span className="flex-1 text-center">
                        {medicament.nom}
                      </span>
                      <span className="flex-1 text-center">
                        {medicament.prenom}
                      </span>
                      <span className="flex-1 text-center">
                        {medicament.email}
                      </span>
                      <span className="flex-1 text-center">
                        {medicament.Role}
                      </span>
                      <span className="flex-1 text-center">Actions</span>
                    </li>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
        <div className="border w-[380px] h-[570px] rounded-md p-4 flex flex-col gap-5 ">
          <div className="h-1/2 border rounded-sm overflow-hidden hover:border-primary-foreground transition duration-700 ease-in-out"></div>
          <div className="flex flex-col gap-5">
            <SectionTitle title="Courbes" />
            <Label htmlFor="file" className=" text-nowrap">
              Mettre à jour les courbes :
            </Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => {
                setSelectedFile(e);
              }}
            />
            <div className="flex flex-col justify-center items-start gap-5 mt-5">
              <div className="flex gap-5 items-center ">
                {" "}
                <Label className="text-nowrap">Sexe :</Label>
                <RadioGroup
                  className="flex gap-5"
                  defaultValue={gender}
                  onValueChange={(e) => {
                    setGender(e);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="MALE" />
                    <Label htmlFor="MALE">Garçon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="FEMALE" />
                    <Label htmlFor="FEMALE">Fille</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex gap-5 items-center ">
                <Label>Type : </Label>
                <RadioGroup
                  className="flex gap-5"
                  defaultValue={type}
                  onValueChange={(e) => {
                    setType(e);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="HEIGHT" id="HEIGHT" />
                    <Label htmlFor="HEIGHT">Hauteur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="WEIGHT" id="WEIGHT" />
                    <Label htmlFor="WEIGHT">Poids</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex gap-5 justify-center items-center mt-5">
              <Alert
                title="Êtes-vous sûr de vouloir mettre à jour la courbe ?"
                btnFun={() => {
                  handleUpdate();
                }}
                description="Cette action ne peut pas être annulée. "
                confirmBtn="Oui, mettre à jour"
              >
                <ToolTip
                  trigger={
                    <Button variant="primary" className="border bg-primary">
                      Mise à jour
                    </Button>
                  }
                  msg="Mise à jour de la courbe"
                />
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
