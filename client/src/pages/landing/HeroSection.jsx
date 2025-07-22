import { useEffect, useRef } from "react";
import "cally";

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
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default HeroSection;
