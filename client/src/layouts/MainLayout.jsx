import { Outlet } from "react-router";
import HeaderNavBar from "../components/Navbar/HeaderNavBar.jsx";

function MainLayout() {
  return (
    <>
      <div className="flex justify-center items-center">
        <HeaderNavBar />
      </div>
      <Outlet />
    </>
  );
}
export default MainLayout;
