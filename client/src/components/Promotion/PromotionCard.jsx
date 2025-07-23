import { UserRound, Check } from "lucide-react";

function PromotionCard() {
  return (
    <div className="group bg-[#F6FAFF] rounded-lg shadow-lg border border-gray-200 w-60 h-80 overflow-hidden hover:text-white hover:bg-[#0E82FD] hover:scale-110 transition-transform duration-300]:">
      <div className="flex gap-6 p-6 items-center">
        <div className="bg-white w-8 h-8 rounded-lg flex justify-center items-center">
          <UserRound className="text-[#3B80F5]" />
        </div>
        <p className="">รายครั้ง</p>
      </div>
      <p className="text-2xl font-bold px-5">$500</p>
      <p className="text-[12px] font-thin px-5 pt-2">สิ่งที่ได้</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 px-5 pt-4">
          <span className="rounded-full w-3 h-3 bg-[#0E82FD] group-hover:bg-white flex justify-center items-center">
            <Check className="w-2 text-white group-hover:text-[#0E82FD]" />
          </span>
          <p className="text-[12px]">การสร้างโปรไฟล์</p>
        </div>
        <div className="flex items-center gap-4 px-5">
          <span className="rounded-full w-3 h-3 bg-[#0E82FD] group-hover:bg-white flex justify-center items-center">
            <Check className="w-2 text-white group-hover:text-[#0E82FD]" />
          </span>
          <p className="text-[12px]">การจองนัดหมาย</p>
        </div>
        <div className="flex items-center gap-4 px-5">
          <span className="rounded-full w-3 h-3 bg-[#0E82FD] group-hover:bg-white flex justify-center items-center">
            <Check className="w-2 text-white group-hover:text-[#0E82FD]" />
          </span>
          <p className="text-[12px]">การแจ้งเตือน</p>
        </div>
        <div className="flex items-center gap-4 px-5">
          <span className="rounded-full w-3 h-3 bg-[#0E82FD] group-hover:bg-white flex justify-center items-center">
            <Check className="w-2 text-white group-hover:text-[#0E82FD]" />
          </span>
          <p className="text-[12px]">การเข้าประวัติการรักษาทางไกล</p>
        </div>
      </div>
      <div className="pt-5 px-3">
        <button className="btn w-full h-8 rounded-full bg-[#0E82FD] text-white group-hover:bg-gray-200 group-hover:text-black">
          จองเลย
        </button>
      </div>
    </div>
  );
}
export default PromotionCard;
