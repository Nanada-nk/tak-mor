import { LoginIcon, SearchIcon, SignUpIcon } from "../icons";
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
       <label className="input rounded-full bg-white text-black flex items-center border-none">
          <SearchIcon className="w-5 opacity-60" />
          <input type="text" placeholder="Search" className="flex-1" />
        </label>
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
