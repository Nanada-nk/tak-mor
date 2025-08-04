import React from "react";

function BookingNavButtons({ onBack, onNext, title }) {
  return (
    <div className="h-1/10 my-4 w-full flex justify-between items-center ">
      <button onClick={onBack} className="btn btn-error text-white">{"<"} ย้อนกลับ</button>
      <button onClick={onNext} className="btn btn-primary">{title} {" >"}</button>
    </div>
  );
}

export default BookingNavButtons;
