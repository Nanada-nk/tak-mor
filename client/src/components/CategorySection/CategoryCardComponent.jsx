import { useNavigate } from "react-router";

function CategoryCardComponent({
  iconSrc = "../../public/cate1.svg",
  title = "หมวดหมู่",
  showSubtitle = false,
  doctorCount = 0,
  path = "/",
  widthClass = "w-40",
  heightClass = "h-35",
  flexClass = "flex-col",
  justifyClass = "justify-center",
  itemsClass = "items-center",
  gapClass = "gap-4",
  fontWeightClass = "font-normal",
}) {
  const navigate = useNavigate();
  const subtitle =
    doctorCount >= 0 ? `มีแพทย์ ${doctorCount} คน` : "ข้อมูลกำลังอัพเดต";
  return (
    <div
      className={`rounded-xl shadow-xl hover:cursor-pointer group flex ${widthClass} ${heightClass} ${flexClass} ${justifyClass} ${itemsClass} ${gapClass}`}
      onClick={() => navigate(path)}
    >
      <div className="w-10 h-10 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA]">
        <img src={iconSrc} alt={title} className="w-7 h-7 object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <p className={`text-sm mt-1 ${fontWeightClass}`}>{title}</p>
        {showSubtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
export default CategoryCardComponent;
