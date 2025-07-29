import Brandner from "../components/Brandner.jsx";
import CategoryCardComponent from "../components/CategorySection/CategoryCardComponent.jsx";

function CategorySpecialtiesPage() {

  const categories = [
    { title: "หัวใจและหลอดเลือด", iconSrc: "../../public/cate1.svg", doctorCount: 15 },
    { title: "ระบบประสาทและสมอง", iconSrc: "../../public/cate2.svg", doctorCount: 12 },
    { title: "ระบบทางเดินปัสสาวะ", iconSrc: "../../public/cate3.svg", doctorCount: 8 },
    { title: "กระดูกและข้อ", iconSrc: "../../public/cate4.svg", doctorCount: 20 },
    { title: "ทันตกรรม", iconSrc: "../../public/cate5.svg", doctorCount: 10 },
    { title: "จักษุวิทยา", iconSrc: "../../public/cate6.svg", doctorCount: 7 },
    { title: "ผิวหนัง", iconSrc: "../../public/cate1.svg", doctorCount: 18 },
    { title: "ทางเดินอาหาร", iconSrc: "../../public/cate2.svg", doctorCount: 14 },
    { title: "กุมารเวช", iconSrc: "../../public/cate3.svg", doctorCount: 25 },
    { title: "จิตเวช", iconSrc: "../../public/cate4.svg", doctorCount: 9 },
    { title: "หู คอ จมูก", iconSrc: "../../public/cate5.svg", doctorCount: 11 },
    { title: "สูตินรีเวช", iconSrc: "../../public/cate6.svg", doctorCount: 16 },
    { title: "ศัลยกรรม", iconSrc: "../../public/cate1.svg", doctorCount: 22 },
    { title: "อายุรกรรม", iconSrc: "../../public/cate2.svg", doctorCount: 19 },
    { title: "รังสีวิทยา", iconSrc: "../../public/cate3.svg", doctorCount: 6 },
    { title: "เวชศาสตร์ฟื้นฟู", iconSrc: "../../public/cate4.svg", doctorCount: 13 },
  ];

  return (
 
    <div className="flex flex-col">
      <Brandner title="แผนก" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <CategoryCardComponent
            key={index}
            title={category.title}
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
          />
        ))}
      </div>
    </div>
  );
}
export default CategorySpecialtiesPage;