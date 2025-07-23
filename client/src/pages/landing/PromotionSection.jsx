import PromotionCard from "../../components/Promotion/PromotionCard"

function PromotionSection() {
  return (
    <div className="flex flex-col items-center gap-3 w-full h-120 pt-8 pb-2">
      <p className="font-bold text-2xl pb-4">โปรโมชั่น</p>
      <div className="flex gap-10">
          <PromotionCard />
          <PromotionCard />
          <PromotionCard />
      </div>
    </div>
  )
}
export default PromotionSection

