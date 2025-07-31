import { CalendarSearch, Hospital, Ambulance } from "lucide-react";
import CategoryCardComponent from "../../components/CategorySection/CategoryCardComponent.jsx";
import { Link } from "react-router";
import { useState } from "react";

function CategorySection() {
  const specialties = [
    {
      title: "หัวใจและหลอดเลือด",
      iconSrc: "../../public/cate1.svg",
      path: "/internalmedicine",
    },
    {
      title: "ระบบประสาทและสมอง",
      iconSrc: "../../public/cate2.svg",
      path: "/internalmedicine",
    },
    {
      title: "ระบบทางเดินปัสสาวะ",
      iconSrc: "../../public/cate3.svg",
      path: "/internalmedicine",
    },
    {
      title: "ระบบกระดูกและข้อต่อ",
      iconSrc: "../../public/cate4.svg",
      path: "/internalmedicine",
    },
    {
      title: "ทันตกรรม",
      iconSrc: "../../public/cate5.svg",
      path: "/internalmedicine",
    },
    {
      title: "จักษุวิทยา",
      iconSrc: "../../public/cate6.svg",
      path: "/internalmedicine",
    },
    {
      title: "อายุรกรรม",
      iconSrc: "../../public/cate6.svg",
      path: "/internalmedicine",
    },
    {
      title: "กุมารเวช",
      iconSrc: "../../public/cate6.svg",
      path: "/internalmedicine",
    },
  ];
  const [departments, setDepartments] = useState(0);
  const visibleCount = 6;
  const visibleSpecialties = [
    ...specialties.slice(departments, departments + visibleCount),
    ...specialties.slice(
      0,
      Math.max(0, departments + visibleCount - specialties.length)
    ),
  ];
  const handlePrev = () => {
    setDepartments((prev) => (prev === 0 ? specialties.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDepartments((prev) => (prev === specialties.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 w-full max-w-5xl">
        <Link to="/doctoravailability">
          <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#F2EDFE]">
              <CalendarSearch />
            </div>
            <p className="text-sm font-semibold">นัดหมาย</p>
          </div>
        </Link>
        <Link to="">
          <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
              <Hospital />
            </div>
            <p className="text-sm font-semibold">โรงพยาบาล/คลีนิค</p>
          </div>
        </Link>
        <Link to="/doctorlist">
          <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#DD2590] bg-[#FCEBF5]">
              <CalendarSearch />
            </div>
            <p className="text-sm font-semibold">ทักหมอ</p>
          </div>
        </Link>
        <Link to="/call">
          <div className="w-full h-30 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center hover:cursor-pointer hover:bg-[#FCEFEA] p-4">
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#E04F16] bg-[#FFE8E8]">
              <Ambulance />
            </div>
            <p className="text-sm font-semibold">บริการฉุกเฉิน</p>
          </div>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mt-10 sm:mt-12 px-4 sm:px-0">
        <p className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">แผนก</p>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors"
            onClick={handlePrev}
          >
            {"<"}
          </button>
          <button
            className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors"
            onClick={handleNext}
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 w-full max-w-5xl">
        {visibleSpecialties.map((item, index) => (
          <CategoryCardComponent
            key={index}
            title={item.title}
            iconSrc={item.iconSrc}
            widthClass="w-full"
            heightClass="h-35"
            flexClass="flex-col"
            justifyClass="justify-center"
            itemsClass="items-center"
            gapClass="gap-4"
            fontWeightClass="font-bold"
            fontSize="text-[12px]"
            lineHeight="leading-4"
            path={item.path}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8 mb-10">
        <Link
          to="/categoryspecialties"
          className="btn bg-gradient-to-r from-[#0E82FD] to-[#06aed4] hover:bg-gradient-to-r hover:from-white hover:to-[#FCEFEA] text-white rounded-full 
                     w-full sm:w-48 lg:w-56 px-6 py-3 font-semibold hover:text-black transition-colors flex items-center justify-center"
        >
          {" "}
          {/* เพิ่ม flex items-center justify-center */}
          ดูแผนกเพิ่มเติม
        </Link>
      </div>
    </div>
  );
}

export default CategorySection;
