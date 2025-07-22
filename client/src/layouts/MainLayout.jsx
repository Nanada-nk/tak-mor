import { Outlet } from "react-router";

import Footer from "../components/footer/Footer";
import HeaderNavBar from "../components/Navbar/HeaderNavBar";

function MainLayout() {
  return (
    <>

      <div className="flex justify-center items-center">
        <HeaderNavBar />
      </div>
      <Outlet />
      <Footer />

    </>
  );
}
export default MainLayout;
