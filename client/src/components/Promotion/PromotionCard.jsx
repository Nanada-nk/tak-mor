import { UserRound, Check } from "lucide-react";
import { Link } from "react-router";

function PromotionCard({
  title = "รายครั้ง",
  price = "500",
  features = [],
  showPopular = false,
}) {
  return (
    <div className="group relative bg-[#F6FAFF] rounded-lg shadow-lg border border-gray-200 w-full max-w-xs mx-auto overflow-hidden hover:text-white hover:bg-[#0E82FD] hover:scale-105 transition-all duration-300 flex flex-col justify-between h-full">
      {showPopular && (
        <div className="absolute top-4 right-2 bg-primary-gradient text-white text-xs font-bold px-2 py-1 rounded-full z-10 border border-white pointer-events-none">
          ยอดนิยม
        </div>
      )}
      <div className="flex flex-col flex-grow">
        <div className="flex gap-4 p-4 items-center">
          <div className="bg-white w-8 h-8 rounded-lg flex justify-center items-center flex-shrink-0">
            <UserRound className="text-[#3B80F5] w-5 h-5" />
          </div>
          <p className="text-base font-semibold">{title}</p>
        </div>

        <p className="text-3xl font-bold px-4">${price}</p>
        <p className="text-xs font-thin px-4 pt-2 text-gray-600">สิ่งที่ได้</p>

        <div className="flex flex-col gap-2 mt-4 flex-grow">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4">
              <span className="rounded-full w-4 h-4 bg-[#0E82FD] group-hover:bg-white flex justify-center items-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-white group-hover:text-[#0E82FD]" />
              </span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6 px-4 pb-4">
        <Link to="/doctoravailability">
          <button className="btn w-full h-10 rounded-full bg-primary-gradient text-white font-semibold hover:bg-gradient-to-r hover:from-white hover:to-gray-200 hover:text-black transition-colors">
            จองเลย
          </button>
        </Link>
      </div>
    </div>
  );
}
export default PromotionCard;
