import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";
import { Header, SideBar } from "components";

function DashboardLayout() {
  return (
    <div className="dashboard flex">
      <SideBar />
      <div className="rightContent">
        <Header />
        <div className="daynamicContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
