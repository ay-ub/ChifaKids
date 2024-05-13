import { useState } from "react";
import { CiLogout, IoIosArrowDropleftCircle } from "assets/icon/index";
import SideLinkData from "data/SideLinkData";
import { NavLink } from "react-router-dom";
import { handleLogOut } from "./sideFun";
import { useAuth } from "hooks";
import { Alert } from "components";
import Logo from "assets/images/logo.svg";

function SideBar() {
  const auth = useAuth();
  const [isHidden, setIsHidden] = useState(null);
  const handleSide = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className={`sideBar bg-darkBg ${isHidden ? "hideSideBar" : ""}`}>
      <span className="controlSideBar" onClick={handleSide}>
        <IoIosArrowDropleftCircle />
      </span>
      <div className="top flex items-center justify-center">
        <div className="max-w-20 aspect-square">
          <img src={Logo} alt="Logo" className="w-full" />
        </div>
      </div>
      <div className="links flex">
        {SideLinkData.map((link, index) => {
          return (
            link.permission.includes(auth.user.typeUser) && (
              <NavLink
                className="flex items-center "
                key={index}
                to={link.path}
              >
                <span className="icon">{<link.icon />}</span>
                <span className="linkText">{link.name}</span>
              </NavLink>
            )
          );
        })}
      </div>
      <Alert
        title="Voulez-vous vous déconnecter du compte ?"
        btnFun={() => {
          handleLogOut(auth);
        }}
        description="Cette action ne peut pas être annulée. Cela vous déconnectera de
            votre compte."
        confirmBtn="oui , Déconnecter"
      >
        <div className="logout flex items-center">
          <span className="pc-f flex items-center">
            <CiLogout />
          </span>
          <span>Déconnecter</span>
        </div>
      </Alert>
    </div>
  );
}

export default SideBar;
