import { Outlet } from "react-router"

import Footer from "../components/footer/Footer"
import HeaderNavBar from "../components/Navbar/HeaderNavBar";



function MainLayout() {
  return (
    <>
    <HeaderNavBar />
    <div className="p-6">
    <Outlet />
    </div>
    <Footer/>
    </>
  );
}
export default MainLayout;
