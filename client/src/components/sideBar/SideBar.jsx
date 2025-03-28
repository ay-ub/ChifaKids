import { useState } from "react";
import { CiLogout, IoIosArrowDropleftCircle } from "assets/icon/index";
import SideLinkData from "data/SideLinkData";
import { NavLink } from "react-router-dom";
import { handleLogOut } from "./sideFun";
import { useAuth } from "hooks";
import { Alert, ToolTip } from "components";
import Logo from "assets/images/logo.svg";

function SideBar() {
  const auth = useAuth();
  const [isHidden, setIsHidden] = useState(
    localStorage.getItem("isHidden") === "true" ? true : false
  );
  const handleSide = () => {
    localStorage.setItem("isHidden", !isHidden);
    setIsHidden(!isHidden);
  };

  return (
    <div className={`sideBar bg-darkBg ${isHidden ? "hideSideBar" : ""}`}>
      <span className="controlSideBar" onClick={handleSide}>
        <IoIosArrowDropleftCircle />
      </span>
      <div className="top flex items-center justify-center">
        <div className="w-[70px] aspect-square p-2 select-none rounded-full ">
          <img src={Logo} alt="Logo" className="w-full" />
        </div>
      </div>
      <div className="links flex">
        {SideLinkData.map((link, index) => {
          return (
            link.permission.includes(auth.user.typeUser) && (
              <NavLink
                key={index}
                className="flex items-center "
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
          <ToolTip
            trigger={
              <span className="pc-f flex items-center">
                <CiLogout />
              </span>
            }
            msg="Déconnecter"
          />
          <span>Déconnecter</span>
        </div>
      </Alert>
    </div>
  );
}

export default SideBar;
