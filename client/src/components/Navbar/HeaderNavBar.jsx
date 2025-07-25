import authStore from "../../stores/authStore";
import { LoginIcon, SignUpIcon } from "../icons";
import SearchBar from "../SearchBar";
import DropdownNavBar from "./DropdownNavBar";
import { useNavigate } from "react-router";
import { DropdownIcon } from "../icons";
import { toast } from "react-toastify";

function HeaderNavBar() {
  

  const navigate = useNavigate()
  const navigateHome = () => {
    navigate('/')
  }



  const user = authStore((state)=>state.user)
  // const token = authStore((state)=>state.token)
  const actionLogout = authStore((state)=>state.actionLogout)
  //  const checkAuth = authStore((state) => state.checkAuth);

// if(!user) {
//   return <p>ggggggggggg</p>
// }

  return (
    <div className="navbar flex justify-between w-[1200px] h-14 mt-2 mb-5">
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
            onClick={() => navigate('/rolepick')}
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
            className="btn bg-[#0E82FD] pl-5 text-white rounded-full">
           {user?.patientProfile?.firstName && user?.patientProfile?.lastName
    ? `${user.patientProfile.firstName} ${user.patientProfile.lastName}`
    : `Doctor ${user.doctorProfile.firstName} ${user.doctorProfile.lastName}`}
            <DropdownIcon className="w-4 mt-1 text-white" />
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
                  toast.success('Logout Successful')
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
