import React from "react";

function BookingNavButtons({ onBack, onNext }) {
  return (
    <div className="h-1/10 flex justify-between items-center px-5">
      <button onClick={onBack} className="btn btn-error">{"<"} Back</button>
      <button onClick={onNext} className="btn btn-primary">Select Date & Time {" >"}</button>
    </div>
  );
}

export default BookingNavButtons;
