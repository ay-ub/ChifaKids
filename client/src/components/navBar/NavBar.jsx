import "./navBar.css";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

function NavBar() {
  return (
    <TabsList>
      <TabsTrigger value="Antécédents">Antécédents</TabsTrigger>
      <TabsTrigger value="Consultation">Consultation</TabsTrigger>
      <TabsTrigger value="Ordonnance">Ordonnance</TabsTrigger>
      <TabsTrigger value="Compte">Compte rendu</TabsTrigger>
      <TabsTrigger value="Certificat">Certificat et Courrier</TabsTrigger>
      <TabsTrigger value="Courbes">Courbes graphiques</TabsTrigger>
    </TabsList>
  );
}

export default NavBar;
