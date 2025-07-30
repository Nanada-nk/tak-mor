import React from "react";

// Optionally import icons if not provided as props
import { PinIcon, StarIcon } from "../icons/index.jsx";


function DoctorCardDynamic({
  name,
  title,
  rating,
  address,
  img,
  ratingIcon,
  addressIcon
}) {
  return (
    <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex rounded-2xl">
      <div className=" w-1/5 avatar flex items-center justify-center">
        <div className="w-25 rounded-full">
          <img src={img} alt={name} />
        </div>
      </div>
      <div className=" w-4/5 p-1 flex flex-col justify-between items-start">
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-start ">
            <div className="font-bold">{name}</div>
            <div className="text-blue-700 ">{title}</div>
          </div>
          <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
            {ratingIcon ? ratingIcon : <StarIcon className="h-4" />}
            <div className="text-white text-sm">{rating}</div>
          </div>
        </div>
        <div className="flex items-center justify-start">
          {addressIcon ? addressIcon : <PinIcon className="h-5" />}
          <div className="text-gray-500">{address}</div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCardDynamic;
