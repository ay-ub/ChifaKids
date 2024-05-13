import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateUserForm({ user, setUser }) {
  return (
    <div className="grid gap-4 ">
      <form className="grid gap-4">
        <div className="flex flex-col gap-3">
          <Label className="textColor" htmlFor="Name">
            Nom :
          </Label>
          <Input
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
            }}
            value={user.firstName}
            id="Name"
            className="col-span-2 h-8"
            placeholder="Nom de l'utilisateur"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="textColor" htmlFor="prenom">
            Prénom :
          </Label>
          <Input
            value={user.lastName}
            onChange={(e) => {
              setUser({ ...user, lastName: e.target.value });
            }}
            id="prenom"
            className="col-span-2 h-8"
            placeholder="Prénom de l'utilisateur"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="textColor" htmlFor="email">
            Email :
          </Label>
          <Input
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            id="email"
            className="col-span-2 h-8"
            placeholder="Email de l'utilisateur"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="textColor text-nowrap" htmlFor="email">
            mot de passe :
          </Label>
          <Input
            value={user.password}
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            id="email"
            className="col-span-2 h-8"
            placeholder="mot de passe de l'utilisateur"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Select
            onValueChange={(e) => {
              setUser({ ...user, typeUser: e });
            }}
            value={user.typeUser}
          >
            <label className="textColor">Rôle : </label>
            <SelectTrigger className="w-[460px]">
              <SelectValue placeholder="Sélectionner le rôle :" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NURSE">infirmier</SelectItem>
              <SelectItem value="DOCTOR">médecin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
}

export default CreateUserForm;
