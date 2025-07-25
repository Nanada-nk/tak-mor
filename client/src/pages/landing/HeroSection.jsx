import { Check } from "lucide-react";

// import "cally";

import SearchBar from "../../components/SearchBar";

function HeroSection() {
  return (
    <div className="flex justify-center bg-[#EEF7FB] w-full h-150 gap-30 pt-10">
      <div className="flex flex-col gap-8 pt-20">
        <span className="flex flex-col gap-5">
          <p className=" text-4xl">
            ปรึกษาปัญหาสุขภาพเป็นเรื่อง "ง่ายและเร็ว"{" "}
            <span className="text-[#3B80F5]">
              <br /> ทักหมอ
            </span>{" "}
            สามารถช่วยคุณได้
          </p>
          <p>เริ่มต้นการรักษาของคุณกับ ทักหมอ</p>
        </span>
        <div className="flex gap-4">
          <div className="btn bg-[#0E82FD] text-white rounded-full w-fit">
            ปรึกษาปัญหาสุขภาพ
          </div>
          <div>
            <img
              src="../../public/Graphics.svg"
              alt="arrowcuel"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
        <div className="flex justify-between items-center bg-white w-xl h-12 rounded-lg p-2 gap-2">
          <SearchBar placeholder="ค้นหา หมอ" />
          <input
            type="date"
            className="flex-1 rounded-lg h-9 px-2 text-sm  "
            style={{ minWidth: 130 }}
          />
          <button className="btn bg-[#0E82FD] text-white rounded-full hover:text-black hover:bg-[#FCEFEA]">
            ค้นหา
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="bg-[#E6E8ED] w-[400px] h-[400px]  rounded-full shadow-white shadow-sm flex items-center justify-center mt-5">
          <div className="bg-[#0E82FD] w-[300px] h-[300px] rounded-full border-10 border-white shadow-white shadow-2xl">
            <img
              src="../../public/DocImageLandingPage1.svg"
              alt="DocImage"
              className="w-90 h-100 object-contain absolute top-[-8px] left-3"
            />
          </div>
        </div>
        <div className="w-30 h-40 bg-white rounded-xl shadow-2xl shadow-gray absolute top-35 left-75 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mt-4 relative bg-gray-300">
            <img
              src="../../public/DocImageLandingPage2.svg"
              alt="DocImage"
              className="w-16 h-16 object-contain"
            />
          </div>
          <p className="text-center pt-2">จอร์น โด</p>
          <p className="text-center text-xs ">แพทย์</p>
          <button className="btn bg-gray-300 w-fit h-fit text-[8px] rounded-full mt-2.5 font-thin hover:bg-[#0E82FD] hover:text-white">
            จองเลย
          </button>
        </div>
        <div className="w-40 h-10 bg-white rounded-lg absolute top-60 right-70 flex justify-center items-center gap-3 shadow-2xl">
          <div className="w-6 h-6 bg-[#0E82FD] rounded-lg flex justify-center items-center">
            <Check className="text-white w-5" />
          </div>
          <p className="text-xs">ตรวจสุขภาพประจำปี</p>
        </div>
        <div className="w-60 h-25 bg-white rounded-lg absolute top-95 right-14 p-4 shadow-2xl">
          <p className="text-xs">พบกับแพทย์ของเรา</p>
          <div className="flex max-w-[240px] mt-2">
            <img
              src="../../public/patient1.svg"
              alt="Patient1"
              className="w-10 h-10 object-contain -ml-0"
            />
            <img
              src="../../public/patient2.svg"
              alt="Patient2"
              className="w-10 h-10 object-contain -ml-3"
            />
            <img
              src="../../public/patient3.svg"
              alt="Patient3"
              className="w-10 h-10 object-contain -ml-3"
            />
            <img
              src="../../public/patient4.svg"
              alt="Patient4"
              className="w-10 h-10 object-contain -ml-3"
            />
            <img
              src="../../public/patient5.svg"
              alt="Patient5"
              className="w-10 h-10 object-contain -ml-3"
            />
            <img
              src="../../public/patient6.svg"
              alt="Patient6"
              className="w-10 h-10 object-contain -ml-3"
            />
            <div className="w-10 h-10 border rounded-full flex justify-center items-center text-white bg-[#0E82FD] -ml-3">12K+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
