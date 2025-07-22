import { useEffect, useRef } from "react";
import "cally";
import SearchBar from "../../components/SearchBar";

function HeroSection() {
  
  return (
    <div className="flex bg-[#EEF7FB] w-full h-150">
      <div className="flex flex-col gap-8 pt-20 pl-70">
        <span className="flex flex-col gap-5">
          <p className=" text-2xl">
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
              alt="web-logo"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      <div className="flex justify-between items-center bg-white w-xl h-12 rounded-lg p-2">
        <SearchBar placeholder="ค้นหา หมอ"/>
        
       <button className="btn bg-[#0E82FD] text-white rounded-full">ค้นหา</button>
      </div>
      </div>
      <div className="bg-[#E2E3E8] w-[500px] h-[500px] rounded-full shadow-sm flex items-center justify-center">
        <div className="bg-[#5b5bdb] w-[300px] h-[300px] rounded-full border-white shadow-white-2xl"></div>
      </div>
    </div>
  );
}

export default HeroSection;
