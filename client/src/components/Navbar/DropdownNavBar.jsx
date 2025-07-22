import { DropdownIcon } from "../icons";

function DropdownNavBar() {
  return (
    <>
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="m-1 cursor-pointer flex gap-2">
          หน้าแรก
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
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="m-1 cursor-pointer flex gap-2">
          หมอ
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
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="m-1 cursor-pointer flex gap-2">
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
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="m-1 cursor-pointer flex gap-2">
          ข่าวสาร
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
    </>
  );
}
export default DropdownNavBar;
