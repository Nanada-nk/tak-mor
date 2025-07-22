import { LoginIcon, SignUpIcon } from "../icons";
import SearchBar from "../SearchBar";
import DropdownNavBar from "./DropdownNavBar";


function HeaderNavBar() {
  return (
    <div className="navbar flex justify-between w-[1200px] h-14 mt-2">
      <a className="hover:cursor-pointer">
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
        <button className="btn bg-black text-white rounded-full">
          <SignUpIcon className="w-5" />
          สมัครสมาชิค
        </button>
        <button className="btn bg-[#0E82FD] text-white rounded-full">
          <LoginIcon className="w-5 text-white"/>
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
export default HeaderNavBar;
