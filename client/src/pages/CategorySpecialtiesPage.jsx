import Brandner from "../components/Brandner.jsx";
import CategoryCardComponent from "../components/CategorySection/CategoryCardComponent.jsx";

function CategorySpecialtiesPage() {
  const categories = [
    {
      title: "หัวใจและหลอดเลือด",
      iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362013/cate1_mzfcrs.svg",
      doctorCount: 15,
      path:"/internalmedicine"
    },
    {
      title: "ระบบประสาทและสมอง",
      iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362014/cate2_xk6rww.svg",
      doctorCount: 12,
    },
    {
      title: "ระบบทางเดินปัสสาวะ",
      iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362015/cate3_zgrnwr.svg",
      doctorCount: 8,
    },
    {
      title: "กระดูกและข้อ",
      iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362014/cate4_fhxxhv.svg",
      doctorCount: 20,
    },
    { title: "ทันตกรรม", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362015/cate5_blrgze.svg", doctorCount: 10 },
    { title: "จักษุวิทยา", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362016/cate6_ecfclq.svg", doctorCount: 7 },
    { title: "ผิวหนัง", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362013/cate1_mzfcrs.svg", doctorCount: 18 },
    {
      title: "ทางเดินอาหาร",
      iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362014/cate2_xk6rww.svg",
      doctorCount: 14,
    },
    { title: "กุมารเวช", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362015/cate3_zgrnwr.svg", doctorCount: 25 },
    { title: "จิตเวช", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362014/cate4_fhxxhv.svg", doctorCount: 9 },
    { title: "หู คอ จมูก", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362015/cate5_blrgze.svg", doctorCount: 11 },
    { title: "สูตินรีเวช", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362016/cate6_ecfclq.svg", doctorCount: 16 },
    { title: "ศัลยกรรม", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362013/cate1_mzfcrs.svg", doctorCount: 22 },
    { title: "อายุรกรรม", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362014/cate2_xk6rww.svg", doctorCount: 19 },
    { title: "รังสีวิทยา", iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362015/cate3_zgrnwr.svg", doctorCount: 6 },
    {
      title: "เวชศาสตร์ฟื้นฟู",
      iconSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362014/cate4_fhxxhv.svg",
      doctorCount: 13,
    },
  ];

  return (
    <div className="flex flex-col font-prompt">
      <Brandner title="แผนก" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <CategoryCardComponent
            key={index}
            title={category.title}
            path={category.path}
            iconSrc={category.iconSrc}
            doctorCount={category.doctorCount}
            showSubtitle={true}
            widthClass="w-[150px] sm:w-[250px]"
            heightClass="h-[200px] sm:h-[300px]"
            flexClass="flex-col"
            justifyClass="justify-center"
            itemsClass="items-center"
            gapClass="gap-4"
            fontWeightClass="font-bold"
            fontSize="text-lg"
            lineHeight="leading-12"
          />
        ))}
      </div>
    </div>
  );
}
export default CategorySpecialtiesPage;
