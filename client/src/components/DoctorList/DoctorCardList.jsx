import { Star, MapPin, Dot } from "lucide-react";
import { Link } from "react-router";

function DoctorCardList({
  name,
  specialty,
  rating,
  reviews,
  hospital,
  status,
  price,
  imgSrc,
  linkPath = "/",
  showButton = false,
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-xs mx-auto overflow-hidden hover:cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
      <Link to={linkPath}>
        <div className="relative">
          <div className="w-full h-60 overflow-hidden">
            <img src={imgSrc} alt={name} className="w-full" />
          </div>

          <span className="absolute top-3 right-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            ${price}
          </span>
        </div>

        <div className="flex flex-col-2 justify-between p-4 gap-4">
          <div className="flex flex-col items-start">
            <p className="text-base sm:text-lg font-bold">{name}</p>
            <p className="text-gray-400 text-xs">{specialty}</p>
          </div>

          <div className="flex items-center gap-1">
            <div className="bg-[#FFCA18] w-10 h-5 rounded-full flex justify-center items-center gap-1 px-1">
              <Star className="w-3 h-3 text-white" />
              <p className="text-white text-xs">{rating}</p>
            </div>
            <p className="text-xs text-gray-400">({reviews})</p>
          </div>
        </div>

        <div className="divider w-11/12 mx-auto my-2"></div>
        <div className="flex flex-col sm:flex-row gap-2 px-4 pb-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <p className="text-gray-400 text-xs">{hospital}</p>
          </div>
          <div className="bg-[#EDF9F0] px-2 py-1 rounded-full flex justify-center items-center gap-1">
            <Dot className="text-[#04BD6C] w-2.5 h-2.5" />
            <p className="text-xs text-[#04BD6C]">{status}</p>
          </div>
        </div>
      </Link>
      <div className="mb-4">
        {showButton && (
          <div className="flex justify-center gap-2">
            <button className="btn bg-black rounded-full w-1/2 text-white text-sm px-4 py-2 mx-2">
              ตารางเวลา
            </button>
            <button className="btn bg-primary-gradient rounded-full w-1/3 text-white text-sm px-4 py-2 mx-2">
              จองเลย
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default DoctorCardList;
