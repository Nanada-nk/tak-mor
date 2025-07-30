import CategoryCardComponent from "../../components/CategorySection/CategoryCardComponent";
import { Link } from "react-router";
function ServiceInternalSection() {
  return (
    <div className="font-prompt relative -top-30 container mx-auto px-4 py-10 flex flex-col items-center">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mt-10 sm:mt-12 px-4 sm:px-0">
        <div className="mt-4">
          <p className="text-xl sm:text-4xl font-bold mb-4 sm:mb-0">
            บริการเฉพาะทาง
          </p>
          <p className="text-xl sm:text-lg mb-4 sm:mb-0 mt-0 sm:mt-6">
            เข้าถึงทีมแพทย์และแพทย์ผู้เชี่ยวชาญ เทคโนโลยีทันสมัย ได้ที่นี่
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors">
            {"<"}
          </button>
          <button className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors">
            {">"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-6 w-full max-w-5xl duration-700">
 
        <CategoryCardComponent
          title="ระบบประสาทและสมอง"
          iconSrc="../../public/cate2.svg"
          widthClass="w-full lg:w-55"
          heightClass="h-75"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-bold"
          fontSize="text-lg"
          lineHeight="leading-6"
        />
      
        <CategoryCardComponent
          title="ระบบกระดูกและข้อต่อ"
          iconSrc="../../public/cate4.svg"
          widthClass="w-full lg:w-55"
          heightClass="h-75"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-bold"
          fontSize="text-lg"
          lineHeight="leading-6"
        />
        <CategoryCardComponent
          title="ทันตกรรม"
          iconSrc="../../public/cate5.svg"
          widthClass="w-full lg:w-55"
          heightClass="h-75"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-bold"
          fontSize="text-lg"
          lineHeight="leading-6"
        />
        <CategoryCardComponent
          title="จักษุวิทยา"
          iconSrc="../../public/cate6.svg"
          widthClass="w-full lg:w-55"
          heightClass="h-75"
          flexClass="flex-col"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-4"
          fontWeightClass="font-bold"
          fontSize="text-lg"
          lineHeight="leading-6"
        />
      </div>
    </div>
  );
}
export default ServiceInternalSection;
