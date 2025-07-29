import SearchBar from "../../components/SearchBar";
function InternalHeroSection() {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-evenly bg-gradient-to-l from-[#1968a4] to-[#dfebf4] w-full xl:h-100  py-10 lg:py-20 px-4 sm:px-6 lg:px-8 gap-8 lg:gap-20 overflow-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 pt-10 lg:pt-0 text-center lg:text-left max-w-full lg:max-w-xl z-10">
        <div className="flex flex-col gap-3 lg:gap-5">
          <p className=" text-2xl sm:text-[28px] font-bold">
            <span className="text-[#3B80F5] text-3xl">
              <br /> ค้นหาหมอ,
              <br className="sm:hidden" />
            </span>
            <span className="text-[#2960be] text-3xl">
              <br /> ทำการนัดหมาย
              <br className="sm:hidden" />
            </span>
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            เข้าถึงแพทย์ผู้เชี่ยวชาญ และบริการที่ล้ำสมัย และสถานที่ใดก็ได้ที่
            คุณสะดวก
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center bg-white w-full max-w-md lg:max-w-xl rounded-lg p-2 gap-2 shadow-lg mt-4">
          <SearchBar placeholder="ค้นหา หมอ" />
          <input
            type="date"
            className="flex-1 rounded-lg h-9 pl-4 pr-2 sm:px-2 py-0.5 sm:py-0 text-sm w-[325px] border border-[#EEF7FB] sm:border-none"
            style={{ minWidth: 130 }}
          />
          <button className="btn bg-gradient-to-r from-[#0E82FD] to-[#06aed4] text-white rounded-full w-[330px] sm:w-auto px-6 py-2 font-semibold hover:text-black hover:bg-[#FCEFEA] transition-colors">
            ค้นหา
          </button>
        </div>
      </div>

      <div className="relative block lg:block w-70 sm:w-96 h-70 sm:h-96 flex-shrink-0">
        <div className="bg-[#0E82FD] w-100 h-100 rounded-full border-4 border-gray-400 shadow-[#0E82FD] shadow-2xl flex items-center justify-center absolute top-40 sm:top-50 xl:top-50 -right-14 sm:right-10 xl:right-30">
          <img
            src="../../public/DocImageInternalPage1.svg"
            alt="DocImage"
            className="w-full h-full object-contain absolute top-[-120px] left-3"
          />
        </div>
      </div>
    </div>
  );
}
export default InternalHeroSection;
