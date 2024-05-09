import { Outlet } from "react-router-dom";

import LeftSidebar from "../components/shared/LeftSidebar";
import Topbar from "../components/shared/Topbar";
import RightSidebar from "../components/shared/RightSidebar";
import { CustomizeTheme } from "../components/shared/CustomizeTheme";
import { useState } from "react";
// import Bottombar from "@/components/shared/Bottombar";

const RootLayout = () => {
  const [isThemeOpen,setIsThemeOpen] = useState(false)
  return (
    <div className="container">
      <Topbar />
      <LeftSidebar  setIsThemeOpen={setIsThemeOpen}/>
      <Outlet />
      <RightSidebar />
      <CustomizeTheme isThemeOpen={isThemeOpen} setIsThemeOpen={setIsThemeOpen}/>
      {/* <Bottombar /> */}
    </div>
  );
};

export default RootLayout;
