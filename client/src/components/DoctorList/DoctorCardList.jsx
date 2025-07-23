import { Star, MapPin, Dot } from "lucide-react";
function DoctorCardList() {
  return (
    <div className="flex">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-50 h-70 overflow-hidden hover:cursor-pointer">
        <div className="relative">
          <div className="">
            <img
              src="../../public/DocContainer1.svg"
              alt="DocContainer1"
              className="w-full object-cover"
            />
          </div>
          <span className="absolute top-4 right-2 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
            $500
          </span>
        </div>

        <div className="flex items-center h-12 gap-4 p-1 pt-2">
          <div className="flex flex-col gap-1 p-3">
            <p className="text-[16px] font-bold">พญ.ดาวเนอร์</p>
            <p className="text-gray-400 text-[10px]">แพทย์กระดูกและข้อ</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-[#FFCA18] w-8 h-4 rounded-full flex justify-center items-center gap-1 px-1">
              <Star className="w-3 h-3 text-white" />
              <p className="text-white text-[10px]">4.5</p>
            </div>
            <p className="text-[8px] text-gray-400">(35)</p>
          </div>
        </div>
        <div className="divider w-40 mx-auto mt-2 mb-0"></div>
        <div className="flex gap-4 px-3 justify-evenly items-center">
          <div className="flex items-center gap-1">
            <MapPin className="w-4" />
            <p className="text-gray-400 text-[10px]">โรงพยาบาลศิริราช</p>
          </div>
          <div className="bg-[#EDF9F0] w-8 h-4 rounded-full flex justify-center items-center">
            <Dot className="text-[#04BD6C] w-2.5 h-2.5" />
            <p className="text-[10px] text-[#04BD6C] pb-0.5">ว่าง</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoctorCardList;
