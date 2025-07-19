import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import Header from "../components/Header";
const DashboardLayout = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Header />
      <div className="flex items-start w-full h-[calc(100%-5rem)]">
        <div className="w-[16.25rem] h-full">
        <Aside />
        </div>
        <div className="mx-8 w-full no-scrollbar overflow-y-auto h-full">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
