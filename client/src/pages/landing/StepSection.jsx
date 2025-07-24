function StepSection() {
  return (
    <div
      className="relative flex flex-col items-center gap-3 w-full h-95 pt-8 pb-2 overflow-hidden"
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
        className="absolute bottom-0 right-[-90px] w-[450px] transform scale-x-[-1]"
      />
      <div className="absolute top-55 left-60 bg-[#E2EDFF] rounded-full w-[300px] h-[300px]">
        <img
          src="../../public/DocImageLandingPage3.svg"
          alt="DocImage"
          className="w-80 h-80 object-contain absolute top-[-100px] left-3"
        />
      </div>
      <div className="flex flex-col ml-60 items-center">
        <p className=" text-2xl font-bold">
          4 ขั้นตอนง่ายๆ เพื่อรับโซลูชันทางการแพทย์ของคุณ
        </p>
        <div className="flex items-center justify-center gap-3 pt-6 pl-4 flex-wrap flex-1 w-150">
          <div className="flex items-center gap-4 w-[45%] min-w-[280px] min-h-[120px]">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl shrink-0"></div>
            <span>
              <p className="font-bold">ค้นหา แพทย์</p>
              <p className="text-[10px] text-gray-400 mt-2">
                ค้นหาแพทย์ตามความเชี่ยวชาญ
              </p>
            </span>
          </div>
          <div className="flex items-center gap-4 w-[45%] min-w-[280px] min-h-[120px]">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl shrink-0"></div>
            <span>
              <p className="font-bold">ตรวจสอบโปรไฟล์แพทย์</p>
              <p className="text-[10px] text-gray-400 mt-2">
                สำรวจโปรไฟล์แพทย์โดยละเอียดบนแพลตฟอร์ม
                ของเราเพื่อตัดสินใจเรื่องการดูแลสุขภาพอย่างรอบรู้
              </p>
            </span>
          </div>

          <div className="flex items-center gap-4 w-[45%] min-w-[280px] min-h-[120px]">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl shrink-0"></div>
            <span>
              <p className="font-bold">กำหนดการนัดหมาย</p>
              <p className="text-[10px] text-gray-400 mt-2">
                หลังจากเลือกแพทย์ที่คุณต้องการแล้ว
                <br /> เลือกช่วงเวลาที่สะดวกและยืนยันการนัดหมายของคุณ
              </p>
            </span>
          </div>
          <div className="flex items-center gap-4 w-[45%] min-w-[280px] min-h-[120px]">
            <div className="w-15 h-15 bg-[#E2EDFF] rounded-xl shrink-0"></div>
            <span>
              <p className="font-bold">รับโซลูชันทางการแพทย์ของคุณ</p>
              <p className="text-[10px] text-gray-400 mt-2">
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
