import authStore from "../../stores/authStore.js";
import { LoginIcon, SignUpIcon, DropdownIcon } from "../icons/index.jsx";
import SearchBar from "../SearchBar.jsx";
import DropdownNavBar from "./DropdownNavBar.jsx";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function HeaderNavBar() {


  const navigate = useNavigate()
  const navigateHome = () => {
    navigate('/')
  }


  const user = authStore((state) => state.user)
  const logout = authStore((state) => state.logout)

  const handleProfileClick = () => {
    if (!user) return;
       if (user.role === 'DOCTOR') {
      navigate('/doctorprofile');
    } else {
      navigate('/patientprofile');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout Successful');
    navigate('/'); // Navigate to home page after logout
  };

  return (
    <div className="navbar flex justify-between w-[1350px] h-14 mt-2 mb-5">
      <a onClick={navigateHome} className="hover:cursor-pointer">
        <img
          src="../../public/takmor.svg"
          alt="web-logo"
          className="h-full w-auto object-contain"
        />
      </a>
      <div className="flex gap-5">
        <DropdownNavBar />
      </div>
      <SearchBar />

      <div className="flex gap-2">
        {!user ? (
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => navigate('/rolepick')}
              className="btn bg-black text-white rounded-full">
              <SignUpIcon className="w-5" />
              สมัครสมาชิก
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
              className="btn bg-[#0E82FD] pl-5 text-white rounded-full">
              {user.Patient?.firstName || `Dr. ${user.Doctor?.firstName}`}
              <DropdownIcon className="w-4 mt-1 text-white" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-44 p-2 shadow-sm">
              <li>
                <a onClick={handleProfileClick}>โปรไฟล์</a>
              </li>
              <li>
                <a onClick={handleLogout}>ออกจากระบบ</a>
              </li>
            </ul>
          </div>
        )}
      </div>


    </div>
  );
}
export default HeaderNavBar;
