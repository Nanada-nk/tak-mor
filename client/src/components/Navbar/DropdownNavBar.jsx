import { DropdownIcon } from "../icons/index.jsx";
import { useNavigate } from "react-router";
function DropdownNavBar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="dropdown dropdown-start" onClick={() => {
          navigate("/");
        }}>
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex gap-2"
        >
          หน้าแรก
        </div>
      </div>
      <div className="dropdown dropdown-start">
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex gap-2"
        >
          หมอ
          <DropdownIcon className="w-5" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
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
      <div className="dropdown dropdown-start">
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex gap-2"
        >
          ผู้ป่วย
          <DropdownIcon className="w-5 " />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
      <div className="dropdown dropdown-start" onClick={() => navigate("/news")}>
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex gap-2"
        >
          ข่าวสาร
        </div>
      </div>
      <div
        className="dropdown dropdown-start"
        onClick={() => {
          navigate("/aboutus");
        }}
      >
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex gap-2"
        >
          เกี่ยวกับเรา
        </div>
      </div>
      <div
        className="dropdown dropdown-start"
        onClick={() => {
          navigate("/contactus");
        }}
      >
        <div
          tabIndex={0}
          role="button"
          className="m-1 cursor-pointer flex gap-2"
        >
          ติดต่อเรา
        </div>
      </div>
    </>
  );
}
export default DropdownNavBar;
