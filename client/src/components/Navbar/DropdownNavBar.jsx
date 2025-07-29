import { DropdownIcon } from "../icons/index.jsx";
import { Link, useNavigate } from "react-router";
function DropdownNavBar() {
  const navigate = useNavigate();
  return (
    <>
      <Link
        to="/"
        className="m-1 cursor-pointer flex items-center gap-2 px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
      >
        หน้าแรก
      </Link>
      
      
      <div className="dropdown dropdown-hover"> 
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex items-center gap-2 px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
        >
          หมอ
          <DropdownIcon className="w-4 h-4 mt-0.5" /> 
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg"> 
          <li>
            <a onClick={() => navigate("/doctorlist")}>รายชื่อแพทย์ทั้งหมด</a>
          </li>
          <li>
            <a onClick={() => navigate("/doctoravailability")}>
              ตารางเวลาการให้บริการแพทย์
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/categoryspecialties")}>
              แผนก
            </a>
          </li>
        </ul>
      </div>

  
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex items-center gap-2 px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
        >
          ผู้ป่วย
          <DropdownIcon className="w-4 h-4 mt-0.5" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg">
          <li>
           
            <a onClick={() => navigate("/patientprofile")}>โปรไฟล์ผู้ป่วย</a> 
          </li>
          <li>
         
            <a onClick={() => navigate("/booking")}>การจองนัดหมาย</a> 
          </li>
        </ul>
      </div>

 
      <Link
        to="/news"
        className="m-1 cursor-pointer flex items-center gap-2 px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
      >
        ข่าวสาร
      </Link>

      
      <Link
        to="/aboutus"
        className="m-1 cursor-pointer flex items-center gap-2 px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
      >
        เกี่ยวกับเรา
      </Link>

    
      <Link
        to="/contactus"
        className="m-1 cursor-pointer flex items-center gap-2 px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
      >
        ติดต่อเรา
      </Link>
    </>
  );
}
export default DropdownNavBar;
