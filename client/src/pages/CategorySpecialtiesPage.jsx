import Brandner from "../components/Brandner";
import CategoryCardComponent from "../components/CategorySection/CategoryCardComponent";

function CategorySpecialtiesPage() {
  return (
    <div className="flex flex-col h-200">
      <Brandner title="แผนก" />
      <div className="flex flex-wrap gap-4 justify-center py-5">
        <CategoryCardComponent
          title="หัวใจและหลอดเลือด"
          widthClass="w-100"
          flexClass="flex-row"
          justifyClass="justify-center"
          itemsClass="items-center"
          gapClass="gap-10"
          fontWeightClass="font-bold"
        />
        <CategoryCardComponent title="หัวใจและหลอดเลือด" showSubtitle={false} />
        <CategoryCardComponent title="หัวใจและหลอดเลือด" />
        <CategoryCardComponent title="หัวใจและหลอดเลือด" />
        <CategoryCardComponent title="หัวใจและหลอดเลือด" />
        <CategoryCardComponent title="หัวใจและหลอดเลือด" />
        <CategoryCardComponent title="หัวใจและหลอดเลือด" />
      </div>
    </div>
  );
}
export default CategorySpecialtiesPage;
