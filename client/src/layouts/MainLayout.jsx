import { Outlet } from "react-router";

import Footer from "../components/footer/Footer";
import HeaderNavBar from "../components/Navbar/HeaderNavBar";

function MainLayout() {
  console.log("MainLayout rendered.");
  return (
    <div className="flex flex-col min-h-screen">

      <HeaderNavBar />


      <main className="flex-grow">
        <Outlet />
      </main>


      <Footer />
    </div>
  );
}
export default MainLayout;
