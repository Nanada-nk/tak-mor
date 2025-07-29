import { Stethoscope, UserCheck, CalendarCheck, HeartPulse } from "lucide-react";

function StepSection() {
  return (
    <div
      className="relative flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: "url('public/BgGraphics.svg')",
        backgroundColor: "#EEF7FB",
        backgroundRepeat: "no-repeat",
        backgroundSize: "300px",
        backgroundPosition: "top left",
      }}
    >
      <img
        src="/BgGraphics.svg"
        alt="decor mirror"
        className="absolute bottom-0 right-[-90px] w-[450px] transform scale-x-[-1] hidden lg:block"
      />

      <div className="absolute top-55 left-40 2xl:left-100 bg-[#E2EDFF] rounded-full w-60 sm:w-[300px] h-60 sm:h-[300px] transform -translate-x-1/2 hidden xl:block opacity-0 transition-opacity duration-1000 delay-100 xl:opacity-100">
        <img
          src="../../public/DocImageLandingPage3.svg"
          alt="DocImage"
          className="w-80 h-80 object-contain absolute top-[-100px] left-3 opacity-0 transition-opacity duration-1000 delay-100 xl:opacity-100"
        />
      </div>

      <div className="flex flex-col items-center text-center w-full lg:ml-60 lg:items-start lg:text-left max-w-full lg:max-w-4xl">
        <p className="text-2xl sm:text-3xl font-bold mb-8">
          4 ขั้นตอนง่ายๆ เพื่อรับโซลูชันทางการแพทย์ของคุณ
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Step 1: ค้นหา แพทย์ */}
          <div className="flex items-center gap-4 w-full min-h-[120px] p-4 bg-white rounded-lg shadow-md">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl flex-shrink-0 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-[#0E82FD]" /> {/* Icon สำหรับ "ค้นหา แพทย์" */}
            </div>
            <span>
              <p className="font-bold text-base">ค้นหา แพทย์</p>
              <p className="text-xs text-gray-500 mt-1">
                ค้นหาแพทย์ตามความเชี่ยวชาญ
              </p>
            </span>
          </div>
          
          {/* Step 2: ตรวจสอบโปรไฟล์แพทย์ */}
          <div className="flex items-center gap-4 w-full min-h-[120px] p-4 bg-white rounded-lg shadow-md">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl flex-shrink-0 flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-[#0E82FD]" /> {/* Icon สำหรับ "ตรวจสอบโปรไฟล์แพทย์" */}
            </div>
            <span>
              <p className="font-bold text-base">ตรวจสอบโปรไฟล์แพทย์</p>
              <p className="text-xs text-gray-500 mt-1">
                สำรวจโปรไฟล์แพทย์โดยละเอียดบนแพลตฟอร์ม
                ของเราเพื่อตัดสินใจเรื่องการดูแลสุขภาพอย่างรอบรู้
              </p>
            </span>
          </div>

          {/* Step 3: กำหนดการนัดหมาย */}
          <div className="flex items-center gap-4 w-full min-h-[120px] p-4 bg-white rounded-lg shadow-md">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl flex-shrink-0 flex items-center justify-center">
              <CalendarCheck className="w-8 h-8 text-[#0E82FD]" /> {/* Icon สำหรับ "กำหนดการนัดหมาย" */}
            </div>
            <span>
              <p className="font-bold text-base">กำหนดการนัดหมาย</p>
              <p className="text-xs text-gray-500 mt-1">
                หลังจากเลือกแพทย์ที่คุณต้องการแล้ว
                เลือกช่วงเวลาที่สะดวกและยืนยันการนัดหมายของคุณ
              </p>
            </span>
          </div>
          
          {/* Step 4: รับโซลูชันทางการแพทย์ของคุณ */}
          <div className="flex items-center gap-4 w-full min-h-[120px] p-4 bg-white rounded-lg shadow-md">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl flex-shrink-0 flex items-center justify-center">
              <HeartPulse className="w-8 h-8 text-[#0E82FD]" /> {/* Icon สำหรับ "รับโซลูชันทางการแพทย์ของคุณ" */}
            </div>
            <span>
              <p className="font-bold text-base">รับโซลูชันทางการแพทย์ของคุณ</p>
              <p className="text-xs text-gray-500 mt-1">
                หารือเกี่ยวกับปัญหาสุขภาพของคุณกับแพทย์
                และรับคำแนะนำและวิธีแก้ปัญหาแบบส่วนตัว
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StepSection;
