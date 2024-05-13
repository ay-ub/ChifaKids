import { SectionTitle, Alert, ToolTip, Dialog, Table } from "components";
import { Input } from "@/components/ui/input";
import { Notify } from "utils";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AiOutlineDelete } from "assets/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getAllUsers,
  getService,
  mapUsers,
  handleCreateUser,
  handleUpdate,
} from "./SettingsFun";
import { useAuth } from "hooks";
import { motion } from "framer-motion";
import CreateUserForm from "./CreateUserForm";
function Settings() {
  const [selectedFile, setSelectedFile] = useState();
  const [gender, setGender] = useState("MALE");
  const [type, setType] = useState("HEIGHT");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    typeUser: "NURSE",
  });
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  useEffect(() => {
    getService(setServices);
    getAllUsers(setUsers);
  }, []);

  const [service, setService] = useState({
    name: "",
    price: "",
  });

  const createService = async (event) => {
    event.preventDefault();
    if (!service.name || !service.price) {
      return Notify({
        type: "error",
        message: "Veuillez remplir tous les champs",
      });
    }
    const response = await fetch("http://localhost:3000/service/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: service.name,
        price: service.price,
      }),
    });
    const data = await response.json();
    if (data.status == "success") {
      Notify({
        type: "success",
        message: "Service ajouté avec succès",
      });
      setServices((prev) => [...prev, data.data]);
    } else {
      Notify({
        type: "error",
        message: data.message,
      });
    }
    setService({ name: "", price: "" });
  };
  const deleteService = async (id) => {
    const response = await fetch(`http://localhost:3000/service/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.status == "success") {
      Notify({
        type: "success",
        message: "Service supprimé avec succès",
      });
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  const auth = useAuth();

  const usersList = mapUsers(users, search, auth, setUsers);
  return (
    <div>
      <SectionTitle title="paramètres" />
      <div className="flex gap-5 mt-5 items-start  h-[570px]">
        <div className=" flex-1 flex flex-col gap-5 ">
          <div className="border h-[570px] relative rounded-md px-4 py-2 ">
            <div className="flex justify-between items-center">
              <SectionTitle title="Utilisateurs" />
              <div className="flex gap-3 items-center">
                {users.length > 1 && (
                  <Input
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    id="Name"
                    className="p-4"
                    placeholder="Rechercher un utilisateur"
                  />
                )}
                <Dialog
                  btn={<Button variant="outline">Nouveau</Button>}
                  header={
                    <motion.p
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={({ duration: 0.3 }, { delay: 0.1 })}
                      className="text-center text-2xl font-bold mb-4"
                    >
                      Ajouter un utilisateur
                    </motion.p>
                  }
                  body={<CreateUserForm user={user} setUser={setUser} />}
                  btnFun={() => handleCreateUser(user, setUser, setUsers, auth)}
                  btnCancel={() => {
                    setUser({
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      typeUser: "NURSE",
                    });
                  }}
                />
              </div>
            </div>
            <Table
              data={users}
              dataList={usersList}
              headers={["N°", "Prénom", "Nom", "Email", "Rôle", "Actions"]}
            />
          </div>
        </div>
        <div className="border w-[380px] h-[570px] rounded-md p-4 flex flex-col justify-between gap-3 ">
          <div className="flex-1 border rounded-sm overflow-hidden  p-4 flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-center">
              <SectionTitle title="Actes " />

              <Dialog
                btn={<Button variant="outline">Nouveau</Button>}
                header={
                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={({ duration: 0.3 }, { delay: 0.1 })}
                    className="text-center text-2xl font-bold mb-4"
                  >
                    Actes Medicaux
                  </motion.p>
                }
                body={
                  <div className="grid gap-4">
                    <form className="grid gap-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="Name" className="textColor">
                          Nom :
                        </Label>
                        <Input
                          id="Name"
                          value={service.name}
                          className="col-span-2 h-8"
                          placeholder="Nom du Acte"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setService({ ...service, name: e.target.value });
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="price" className="textColor">
                          Prix :
                        </Label>
                        <Input
                          type="number"
                          value={service.price}
                          onChange={(e) => {
                            setService({ ...service, price: e.target.value });
                          }}
                          id="price"
                          min="0"
                          className="col-span-2 h-8"
                          placeholder="Prix du Acte"
                        />
                      </div>
                    </form>
                  </div>
                }
                btnFun={createService}
                btnCancel={() => {
                  setService({ name: "", price: "" });
                }}
              />
            </div>
            <ul className="flex-1 ">
              <ScrollArea className="h-[135px]  rounded-md border p-2">
                {services.map((service, index) => {
                  return (
                    <motion.li
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={({ duration: 0.3 }, { delay: 0.1 * index })}
                      key={index}
                      className="flex gap-5 items-center py-2"
                    >
                      <span className="text-center">{index + 1}</span>
                      <span className="flex-1 text-center text-ellipsis text-nowrap">
                        {service.name}
                      </span>
                      <span className=" text-center">{service.price}DA</span>
                      <span className="text-center">
                        <Alert
                          title="Vous êtes sûr de vouloir supprimer ce service !"
                          btnFun={() => {
                            deleteService(service.id);
                          }}
                          description="Une fois supprimé, vous ne pourrez pas récupérer ce service ."
                          confirmBtn="Oui, supprimer !"
                          cancelBtn="Annuler"
                        >
                          <span className="text-red-400 text-xl">
                            <AiOutlineDelete />
                          </span>
                        </Alert>
                      </span>
                    </motion.li>
                  );
                })}
              </ScrollArea>
            </ul>
          </div>
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
            <div className="flex flex-col justify-center items-start gap-5 mt-3">
              <div className="flex gap-5 items-center ">
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
            <div className="flex gap-5 justify-center items-center mt-3">
              <Alert
                title="Êtes-vous sûr de vouloir mettre à jour la courbe ?"
                btnFun={() => {
                  handleUpdate(selectedFile, gender, type);
                }}
                description="Cette action ne peut pas être annulée. "
                confirmBtn="Oui, mettre à jour"
              >
                <ToolTip
                  trigger={
                    <Button
                      variant="primary"
                      className="border bg-primary text-white"
                    >
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
