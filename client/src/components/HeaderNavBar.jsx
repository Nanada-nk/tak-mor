function HeaderNavBar() {
  return (
    <div className="navbar shadow-sm flex justify-between ">
      <a className="">
        <img
          src="../../public/takmor.svg"
          alt="web-logo"
          className="h-full w-auto object-contain"
        />
      </a>
      
      <div>
        <button className="btn bg-black text-white rounded-full">
          สมัครสมาชิค
        </button>
        <button className="btn bg-[#0E82FD] text-white rounded-full">
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
export default HeaderNavBar;
