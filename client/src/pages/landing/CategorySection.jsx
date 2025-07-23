import { useState, useEffect } from "react";
import { CalendarSearch, Hospital } from "lucide-react";
import { Link } from "react-router";

function CategorySection() {
  return (
    <div className="container h-100 mx-auto px-4">
      <div className="flex gap-6 pt-10 pl-60">
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA]">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#F2EDFE]">
            <CalendarSearch />
          </div>
          <p className="text-sm">นัดหมาย</p>
        </div>
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
            <Hospital />
          </div>
          <p className="text-sm">โรงพยาบาล/คลีนิค</p>
        </div>
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#DD2590] bg-[#FCEBF5]">
            <CalendarSearch />
          </div>
          <p className="text-sm">ทักหมอ</p>
        </div>
        <div className="w-60 h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
            <CalendarSearch />
          </div>
          <p className="text-sm">บริการฉุกเฉิน</p>
        </div>
      </div>
      <p className="text-xl p-6 ml-30 ">แผนก</p>
    </div>
  );
}

export default CategorySection;
