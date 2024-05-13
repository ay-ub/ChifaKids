import { Alert, ToolTip } from "components";
import { Notify } from "utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineDelete } from "assets/icon";
import { motion } from "framer-motion";
import { readFile } from "utils";

const getService = async (setServices) => {
  try {
    const response = await fetch("http://localhost:3000/service/");
    const data = await response.json();
    if (data.status == "success") {
      setServices(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (setUsers) => {
  try {
    const response = await fetch("http://localhost:3000/user/");
    const data = await response.json();
    if (data.status == "success") {
      setUsers(data?.data?.users);
    }
  } catch (error) {
    console.log(error);
  }
};

const DeleteUser = async (email, setUsers, auth) => {
  if (email === "") {
    return Notify({
      type: "error",
      message: "Veuillez remplir tous les champs",
    });
  }
  if (email === auth?.user.email) {
    return Notify({
      type: "error",
      message: "Vous ne pouvez pas supprimer votre propre compte",
    });
  }
  const response = await fetch("http://localhost:3000/user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (data.status == "success") {
    Notify({
      type: "success",
      message: "Utilisateur supprimé avec succès",
    });
    setUsers((prev) => prev.filter((user) => user.email !== email));
  } else {
    Notify({
      type: "error",
      message: data.message,
    });
  }
};

const updateUserType = async (email, type, setUsers) => {
  const response = await fetch(`http://localhost:3000/user/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ typeUser: type }),
  });
  const data = await response.json();
  if (data.status == "success") {
    Notify({
      type: "success",
      message: "Rôle utilisateur mis à jour avec succès",
    });
    setUsers((prev) =>
      prev.map((user) => {
        if (user.email === email) {
          return { ...user, typeUser: type };
        }
        return user;
      })
    );
  } else {
    Notify({
      type: "error",
      message: "Erreur lors de la mise à jour du type d'utilisateur",
    });
  }
};

const mapUsers = (users, search, auth, setUsers) => {
  return users
    .filter(
      (user) =>
        search === "" ||
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.typeUser.toLowerCase().includes(search.toLowerCase())
    )
    .map((user, index) => {
      return user.email !== auth?.user.email ? (
        <motion.tr
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={({ duration: 0.3 }, { delay: 0.3 })}
          key={index}
          className="flex items-center lightBgHover"
        >
          <td className="select-none">{index}</td>
          <td className="select-none">{user.firstName}</td>
          <td className="select-none">{user.lastName}</td>
          <td className="select-none">
            <ToolTip trigger={user.email} msg={user.email} />
          </td>
          <td className="select-none">
            {/* {(user.typeUser === "NURSE" && "Infirmier") ||
              (user.typeUser === "DOCTOR" && "Médecin") ||
              (user.typeUser === "ADMIN" && "Admin")} */}
            <Select
              onValueChange={(e) => {
                updateUserType(user.email, e, setUsers);
              }}
              value={user.typeUser}
            >
              <SelectTrigger className="w-[110px] ml-3">
                <SelectValue placeholder="Sélectionner le rôle :" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NURSE">infirmier</SelectItem>
                <SelectItem value="DOCTOR">médecin</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </td>
          <td className="select-none">
            <Alert
              title="Vous êtes sûr de vouloir supprimer cet utilisateur !"
              btnFun={() => {
                DeleteUser(user.email, setUsers, auth);
              }}
              description="Une fois supprimé, vous ne pourrez pas récupérer cet utilisateur ."
              confirmBtn="Oui, supprimer !"
              cancelBtn="Annuler"
            >
              <td className="action flex justify-center items-center gap-4">
                <AiOutlineDelete className=" text-xl cursor-pointer" />
              </td>
            </Alert>
          </td>
        </motion.tr>
      ) : null;
    });
};

const handleCreateUser = async (user, setUser, setUsers, auth) => {
  console.log("clicked");
  try {
    if (
      user.firstName == "" ||
      user.lastName == "" ||
      user.email == "" ||
      user.password == "" ||
      user.typeUser == ""
    ) {
      return Notify({
        type: "error",
        message: "Veuillez remplir tous les champs",
      });
    }
    if (user.email === auth?.user.email) {
      return Notify({
        type: "error",
        message: "Vous ne pouvez pas ajouter votre propre compte",
      });
    }
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.status == "success") {
      Notify({
        type: "success",
        message: "Utilisateur ajouté avec succès",
      });
      setUsers((prev) => [...prev, data.data.user]);
    } else {
      Notify({
        type: "error",
        message: data.data.massege,
      });
    }
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      typeUser: "NURSE",
    });
  } catch (error) {
    console.log(error);
  }
};

const handleUpdate = async (selectedFile, gender, type) => {
  if (!selectedFile) {
    Notify({
      type: "error",
      message: "Sil vous plaît, sélectionnez un fichier",
    });
    return;
  }
  readFile(selectedFile, gender, type);
};
export { handleUpdate, getService, getAllUsers, mapUsers, handleCreateUser };
