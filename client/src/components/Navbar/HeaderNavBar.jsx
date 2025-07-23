import authStore from "../../stores/authStore";
import { LoginIcon, SignUpIcon } from "../icons";
import SearchBar from "../SearchBar";
import DropdownNavBar from "./DropdownNavBar";
import { useNavigate } from "react-router";
import { DropdownIcon } from "../icons";

function HeaderNavBar() {
  

  const navigate = useNavigate()
  const navigateHome = () => {
    navigate('/')
  }



  const user = authStore((state)=>state.user)
  const actionLogout = authStore((state)=>state.actionLogout)
  //  const checkAuth = authStore((state) => state.checkAuth);


  return (
    <div className="navbar flex justify-between w-[1200px] h-14 mt-2">
      <a onClick={navigateHome} className="hover:cursor-pointer">
        <img
          src="../../public/takmor.svg"
          alt="web-logo"
          className="h-full w-auto object-contain"
        />
      </a>
      <div className="flex gap-8">
        <DropdownNavBar />
      </div>
      <SearchBar />

      <div className="flex gap-2">
       {!user ? (
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => navigate('/register')}
            className="btn bg-black text-white rounded-full">
            <SignUpIcon className="w-5" />
            สมัครสมาชิค
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn bg-[#0E82FD] text-white rounded-full">
            <LoginIcon className="w-5 text-white" />
            เข้าสู่ระบบ
          </button>
        </div>
      ) : (
        <div className="dropdown dropdown-end ml-4">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-[#0E82FD] text-white rounded-full">
           John {user.patientProfile?.firstName} {user.lastName} Doe
            <DropdownIcon className="w-4 ml-2" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-44 p-2 shadow-sm">
            <li>
              <a onClick={() => navigate('/profile')}>โปรไฟล์</a>
            </li>
            <li>
              <a onClick={() => {
                  actionLogout();
                  navigate('/login') }}>
                ออกจากระบบ
              </a>
            </li>
          </ul>
        </div>
      )}
      </div>


    </div>
  );
}
export default HeaderNavBar;
