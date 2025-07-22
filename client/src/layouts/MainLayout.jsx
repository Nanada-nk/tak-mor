import { Outlet } from "react-router"
import HeaderNavBar from "../components/HeaderNavBar"



function MainLayout() {
  return (
    <>
    <HeaderNavBar />
    <Outlet />
    </>
  )
}
export default MainLayout