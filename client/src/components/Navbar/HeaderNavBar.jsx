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
    navigate('/'); 
  };

  return (
  
    <div className="font-prompt navbar bg-base-100 shadow-sm px-4 sm:px-6 lg:px-8 py-2 md:py-4">
     
      
        <a onClick={navigateHome} className="hover:cursor-pointer">
          <img
            src="../../public/takmor.svg"
            alt="web-logo"
            className="h-full w-auto object-contain mr-5" 
          />
        </a>
      

     
      <div className="navbar-center hidden lg:flex">
        <div className="flex gap-5">
          <DropdownNavBar />
        </div>
      </div>

      
      <div className="navbar-end flex-1 flex items-center justify-end gap-2">
       
        <div className="hidden sm:block flex-grow max-w-xs md:max-w-md lg:max-w-sm">
          <SearchBar placeholder="ค้นหา" />
        </div>

        {!user ? (
          
          <div className="hidden lg:flex gap-2 ml-4">
            <button
              onClick={() => navigate('/rolepick')}
              className="btn bg-black text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-colors">
              <SignUpIcon className="w-4 h-4 mr-1" /> 
              สมัครสมาชิก
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn bg-gradient-to-r from-[#0E82FD] to-[#06aed4] text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">
              <LoginIcon className="w-4 h-4 mr-1 text-white" /> 
              เข้าสู่ระบบ
            </button>
          </div>
        ) : (
         
          <div className="hidden lg:block dropdown dropdown-end ml-4">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-[#0E82FD] pl-5 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors">
              {user.Patient?.firstName || `Dr. ${user.Doctor?.firstName}`}
              <DropdownIcon className="w-4 h-4 ml-1 text-white" /> 
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow-sm"> 
              <li>
                <a onClick={handleProfileClick}>โปรไฟล์</a>
              </li>
              <li>
                <a onClick={handleLogout}>ออกจากระบบ</a>
              </li>
            </ul>
          </div>
        )}

        
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
         
            <li><a onClick={() => navigate('/')}>หน้าแรก</a></li>
            <li>
              <a>หมอ</a>
              <ul className="p-2">
                <li><a onClick={() => navigate("/doctorlist")}>รายชื่อแพทย์ทั้งหมด</a></li>
                <li><a onClick={() => navigate("/doctoravailability")}>ตารางเวลาการให้บริการแพทย์</a></li>
                <li><a onClick={() => navigate("/categoryspecialties")}>แผนก</a></li>
              </ul>
            </li>
            <li>
              <a>ผู้ป่วย</a>
              <ul className="p-2">
                <li><a>Item 1</a></li> 
                <li><a>Item 2</a></li> 
              </ul>
            </li>
            <li><a onClick={() => navigate("/news")}>ข่าวสาร</a></li>
            <li><a onClick={() => navigate("/aboutus")}>เกี่ยวกับเรา</a></li>
            <li><a onClick={() => navigate("/contactus")}>ติดต่อเรา</a></li>
            <div className="divider my-2"></div> 
        
            {!user ? (
              <>
                <li>
                  <button onClick={() => navigate('/rolepick')} className="btn btn-sm btn-block bg-black text-white rounded-full">
                    <SignUpIcon className="w-4 h-4 mr-1" /> สมัครสมาชิก
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/login')} className="btn btn-sm btn-block bg-gradient-to-r from-[#0E82FD] to-[#06aed4] text-white rounded-full">
                    <LoginIcon className="w-4 h-4 mr-1 text-white" /> เข้าสู่ระบบ
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleProfileClick} className="btn btn-sm btn-block bg-gradient-to-r from-[#0E82FD] to-[#06aed4] text-white rounded-full">
                    โปรไฟล์
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-sm btn-block rounded-full bg-black text-white">
                    ออกจากระบบ
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default HeaderNavBar;
