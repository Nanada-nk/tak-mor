import { CalendarSearch, Hospital, Ambulance } from "lucide-react";
import CategoryCardComponent from "../../components/CategorySection/CategoryCardComponent.jsx";
import { Link } from "react-router";


function CategorySection() {
  return (
   
    <div className="container mx-auto px-4 py-10 flex flex-col items-center">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 w-full max-w-5xl">
        <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#F2EDFE]">
            <CalendarSearch />
          </div>
          <p className="text-sm font-semibold">นัดหมาย</p>
        </div>
        <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
            <Hospital />
          </div>
          <p className="text-sm font-semibold">โรงพยาบาล/คลีนิค</p>
        </div>
        <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#DD2590] bg-[#FCEBF5]">
            <CalendarSearch /> 
          </div>
          <p className="text-sm font-semibold">ทักหมอ</p>
        </div>
        <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
          <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
            <Ambulance />
          </div>
          <p className="text-sm font-semibold">บริการฉุกเฉิน</p>
        </div>
      </div>

  
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mt-10 sm:mt-12 px-4 sm:px-0">
        <p className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">แผนก</p>
        <div className="flex items-center gap-2">
          <button className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors">
            {"<"}
          </button>
          <button className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors">
            {">"}
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 w-full max-w-5xl">
       
        <CategoryCardComponent
          title="หัวใจและหลอดเลือด"
          iconSrc="../../public/cate1.svg"
          widthClass="w-full" 
          heightClass="h-35"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-semibold"
        />
        <CategoryCardComponent
          title="ระบบประสาทและสมอง"
          iconSrc="../../public/cate2.svg"
          widthClass="w-full"
          heightClass="h-35"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-semibold"
        />
        <CategoryCardComponent
          title="ระบบทางเดินปัสสาวะ"
          iconSrc="../../public/cate3.svg"
          widthClass="w-full"
          heightClass="h-35"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-semibold"
        />
        <CategoryCardComponent
          title="กระดูกและข้อ"
          iconSrc="../../public/cate4.svg"
          widthClass="w-full"
          heightClass="h-35"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-semibold"
        />
        <CategoryCardComponent
          title="ทันตกรรม"
          iconSrc="../../public/cate5.svg"
          widthClass="w-full"
          heightClass="h-35"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-semibold"
        />
        <CategoryCardComponent
          title="จักษุวิทยา"
          iconSrc="../../public/cate6.svg"
          widthClass="w-full"
          heightClass="h-35"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-semibold"
        />
      </div>
      
     <div className="flex justify-center mt-8 mb-10"> 
        <Link 
          to="/categoryspecialties" 
          className="btn bg-gradient-to-r from-[#0E82FD] to-[#06aed4] hover:bg-gradient-to-r hover:from-white hover:to-[#FCEFEA] text-white rounded-full 
                     w-full sm:w-48 lg:w-56 px-6 py-3 font-semibold hover:text-black transition-colors flex items-center justify-center"> {/* เพิ่ม flex items-center justify-center */}
          ดูแผนกเพิ่มเติม
        </Link>
      </div>
    </div>
  );
}

export default CategorySection;