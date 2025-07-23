import { CalendarSearch, Hospital, Ambulance } from "lucide-react";
import { Link } from "react-router";

function CategorySection() {
  return (
    <div className="container h-120 mx-auto px-4 flex flex-col justify-center items-center ">
      <div className="flex gap-6 pt-10">
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA]">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#F2EDFE]">
            <CalendarSearch />
          </div>
          <p className="text-sm">นัดหมาย</p>
        </div>
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA]">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
            <Hospital />
          </div>
          <p className="text-sm">โรงพยาบาล/คลีนิค</p>
        </div>
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA]">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#DD2590] bg-[#FCEBF5]">
            <CalendarSearch />
          </div>
          <p className="text-sm">ทักหมอ</p>
        </div>
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA]">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
            <Ambulance />
          </div>
          <p className="text-sm">บริการฉุกเฉิน</p>
        </div>
      </div>
      <div className="flex justify-evenly items-center gap-220 mt-3">
        <p className="text-xl p-6">แผนก</p>
        <div className="flex items-center gap-1">
          <button className="btn min-w-0 p-0 rounded-full w-6 h-6  hover:bg-[#6938EF] hover:text-white">
            {"<"}
          </button>
          <button className="btn min-w-0 p-0 rounded-full w-6 h-6 hover:bg-[#6938EF] hover:text-white">
            {">"}
          </button>
        </div>
      </div>
      <div className="flex  gap-4 justify-center">
        <div className="w-40 h-35 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer group">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
            <img
              src="../../public/cate1.svg"
              alt="cate1"
              className="w-7 h-7 object-contain"
            />
          </div>
          <p className="text-sm mt-1">หัวใจและหลอดเลือด</p>
        </div>
        <div className="w-40 h-35 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer group">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
            <img
              src="../../public/cate2.svg"
              alt="cate2"
              className="w-7 h-7 object-contain"
            />
          </div>
          <p className="text-sm mt-1">ระบบประสาทและสมอง</p>
        </div>
        <div className="w-40 h-35 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer group">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
            <img
              src="../../public/cate3.svg"
              alt="cate3"
              className="w-7 h-7 object-contain"
            />
          </div>
          <p className="text-sm mt-1">ระบบทางเดินปัสสาวะ</p>
        </div>
        <div className="w-40 h-35 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer group">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
            <img
              src="../../public/cate4.svg"
              alt="cate4"
              className="w-7 h-7 object-contain"
            />
          </div>
          <p className="text-sm mt-1">กระดูกและข้อ</p>
        </div>
        <div className="w-40 h-35 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer group">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
            <img
              src="../../public/cate5.svg"
              alt="cate5"
              className="w-7 h-7 object-contain"
            />
          </div>
          <p className="text-sm mt-1">ทันตกรรม</p>
        </div>
        <div className="w-40 h-35 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer group">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
            <img
              src="../../public/cate6.svg"
              alt="cate6"
              className="w-7 h-7 object-contain"
            />
          </div>
          <p className="text-sm mt-1">จักษุวิทยา</p>
        </div>
      </div>
      <button className="btn w-40 bg-[#0E82FD] text-white mt-6 rounded-full hover:bg-[#FCEFEA] hover:text-black">ดูแผนกเพิ่มเติม</button>
    </div>
  );
}

export default CategorySection;
