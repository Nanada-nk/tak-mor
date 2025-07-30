import { useNavigate } from "react-router";

function CategoryCardComponent({
  iconSrc = "../../public/cate1.svg",
  bgImageUrl = "",
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
  fontSize = "text-sm",
  lineHeight = "",
}) {
  const navigate = useNavigate();
  const subtitle =
    doctorCount >= 0 ? `มีแพทย์ ${doctorCount} คน` : "ข้อมูลกำลังอัพเดต";
  return (
    <div
      className={`rounded-xl shadow-xl hover:cursor-pointer group flex ${widthClass} ${heightClass} ${flexClass} ${justifyClass} ${itemsClass} ${gapClass} ${bgImageUrl} p-4 transition-transform duration-200 hover:scale-[1.02]`}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => navigate(path)}
    >
      <div className="w-15 h-15 rounded-full flex justify-center items-center text-[#6938EF] bg-[#E2EDFF] group-hover:bg-[#FCEFEA] flex-shrink-0">
        <img src={iconSrc} alt={title} className="w-10 h-10 object-contain" />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <p className={`${fontSize} mt-1 ${lineHeight} ${fontWeightClass}`}>
          {title}
        </p>
        {showSubtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
export default CategoryCardComponent;
