import { Check } from "lucide-react";


import SearchBar from "../../components/SearchBar.jsx";

function HeroSection() {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center bg-gradient-to-t from-white to-[#A2C8E5] w-full py-10 lg:py-20 px-4 sm:px-6 lg:px-8 gap-8 lg:gap-20 overflow-hidden">
      
      
      <div className="flex flex-col gap-6 lg:gap-8 pt-10 lg:pt-0 text-center lg:text-left max-w-full lg:max-w-xl z-10">
        <span className="flex flex-col gap-3 lg:gap-5">
          <p className=" text-2xl sm:text-[28px] font-bold">
            ปรึกษาปัญหาสุขภาพเป็นเรื่อง "ง่ายและเร็ว"{" "}
            <span className="text-[#3B80F5] text-3xl">
              <br /> ทักหมอ
              <br className="sm:hidden" />
            </span>{" "}
            สามารถช่วยคุณได้
          </p>
          <p className="text-base sm:text-lg text-gray-700">เริ่มต้นการรักษาของคุณกับ ทักหมอ</p>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <div className="btn bg-gradient-to-r from-[#0E82FD] to-[#06aed4] text-white rounded-full w-full sm:w-fit px-6 py-3 text-base font-semibold hover:bg-blue-700 transition-colors">
            ปรึกษาปัญหาสุขภาพ
          </div>
          <div className="hidden sm:block">
            <img
              src="../../public/Graphics.svg"
              alt="arrowcuel"
              className="h-full w-auto object-contain"
            />
          </div>
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
        <div className="bg-[#e1ebf7] w-full h-full rounded-full shadow-[#e1ebf7] shadow-sm flex items-center justify-center">
          <div className="bg-[#0E82FD] w-3/4 h-3/4 rounded-full border-8 border-white shadow-white shadow-2xl flex items-center justify-center">
            <img
              src="../../public/DocImageLandingPage1.svg"
              alt="DocImage"
              className="w-full h-full object-contain absolute top-[-8px] left-3"
            />
          </div>
        </div>

        <div className="w-30 h-40 bg-white rounded-xl shadow-2xl shadow-gray absolute top-35 left-75 hidden sm:flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mt-4 relative bg-gray-300">
            <img
              src="../../public/DocImageLandingPage2.svg"
              alt="DocImage"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-center pt-2 text-sm font-semibold">จอร์น โด</p>
          <p className="text-center text-xs text-gray-500">แพทย์</p>
          <button className="btn bg-gray-300 w-fit h-fit text-[8px] rounded-full mt-2.5 px-3 py-1 font-thin hover:bg-[#0E82FD] hover:text-white transition-colors">
            จองเลย
          </button>
        </div>
        <div className="w-40 h-10 bg-white rounded-lg absolute top-60 right-70 hidden sm:flex justify-center items-center gap-3 shadow-2xl">
          <div className="w-6 h-6 bg-[#0E82FD] rounded-lg flex justify-center items-center">
            <Check className="text-white w-5" />
          </div>
          <p className="text-xs font-medium">ตรวจสุขภาพประจำปี</p>
        </div>
        <div className="w-60 h-25 bg-white rounded-lg absolute bottom-5 sm:bottom-0 right-10 sm:right-1/4 transform translate-y-1/2 flex flex-col p-4 shadow-2xl">
          <p className="text-xs font-medium text-gray-700">พบกับแพทย์ของเรา</p>
          <div className="flex mt-2">
            <img
              src="../../public/patient1.svg"
              alt="Patient1"
              className="w-10 h-10 object-contain rounded-full -ml-0 border-2  border-white"
            />
            <img
              src="../../public/patient2.svg"
              alt="Patient2"
              className="w-10 h-10 object-contain rounded-full -ml-3 border-2 border-white"
            />
            <img
              src="../../public/patient3.svg"
              alt="Patient3"
              className="w-10 h-10 object-contain rounded-full -ml-3 border-2 border-white"
            />
            <img
              src="../../public/patient4.svg"
              alt="Patient4"
              className="w-10 h-10 object-contain rounded-full -ml-3 border-2 border-white"
            />
            <img
              src="../../public/patient5.svg"
              alt="Patient5"
              className="w-10 h-10 object-contain rounded-full -ml-3 border-2 border-white"
            />
            <img
              src="../../public/patient6.svg"
              alt="Patient6"
              className="w-10 h-10 object-contain rounded-full -ml-3 border-2 border-white"
            />
            <div className="w-10 h-10 border rounded-full flex justify-center items-center text-white bg-[#0E82FD] -ml-3 text-xs font-semibold">12K+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
