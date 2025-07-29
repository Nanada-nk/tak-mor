import React from "react";

function BookingTimeSlots({ slotsByPeriod, selectedTime, onTimeClick, disabled }) {
  return (
    <div className="w-[550px] flex flex-col items-center pl-4">
      {slotsByPeriod.map(({ period, slots }) => (
        <div className="w-full mb-2" key={period}>
          <div className="text-xs font-bold mb-1">{period}</div>
          <div className="flex flex-wrap gap-2">
            {slots.length > 0 ? (
              slots.map(slot => (
                <button
                  key={slot.id}
                  className={`btn btn-xs w-24${selectedTime === `${slot.startTime} - ${slot.endTime}` ? ' bg-blue-800 text-white' : ''}`}
                  onClick={() => onTimeClick(slot)}
                  disabled={disabled}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))
            ) : (
              <div className="col-span-5 text-gray-400 text-center">No slots available for this period</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingTimeSlots;
