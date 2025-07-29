import PromotionCard from "../../components/Promotion/PromotionCard.jsx"

function PromotionSection() {
  return (
    <div className="flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8">
      <p className="font-bold text-2xl sm:text-3xl pb-6">โปรโมชั่น</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <PromotionCard />
          <PromotionCard />
          <PromotionCard />
      </div>
    </div>
  )
}
export default PromotionSection

