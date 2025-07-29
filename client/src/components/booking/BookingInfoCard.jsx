import React from "react";

function BookingInfoCard({ doctor, specialty, service, date, time, appointmentType, hospital }) {
  return (
    <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex flex-col rounded-2xl">
      <div className="flex w-full">
        <div className="w-1/5 avatar flex items-center justify-center">
          <div className="w-25 rounded-full">
            <img src={doctor.img} alt="doctor" />
          </div>
        </div>
        <div className="w-4/5 p-1 flex flex-col justify-between items-start">
          <div className="flex items-start gap-2">
            <div className="flex flex-col items-start ">
              <div className="font-bold">{doctor.name}</div>
              <div className="text-blue-700 ">{doctor.title}</div>
            </div>
            <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
              {doctor.ratingIcon}
              <div className="text-white text-sm">{doctor.rating}</div>
            </div>
          </div>
          <div className="flex items-center justify-start">
            {doctor.addressIcon}
            <div className="text-gray-500">{doctor.address}</div>
          </div>
        </div>
      </div>
      {/* Main Booking Info Section */}
      <div className="mt-2 w-full border-gray-200 pt-2 px-4">
        <div className="flex flex-row justify-between gap-4 text-sm">
          <div className="flex flex-col items-start justify-center w-1/4">
            <span className="font-medium  mb-1">Specialty</span>
            <span className="font-semibold text-gray-700">{specialty || <span className="text-gray-400">Not selected</span>}</span>
          </div>
          <div className="flex flex-col items-start justify-center w-1/4">
            <span className="font-medium  mb-1">Service</span>
            <span className="font-semibold text-gray-700">{service || <span className="text-gray-400">Not selected</span>}</span>
          </div>
          <div className="flex flex-col items-start justify-center w-1/4">
            <span className="font-medium  mb-1">Date & Time</span>
            <span className="font-semibold text-gray-700">
              {date && time
                ? <span className="text-gray-600">{`${date} ${time}`}</span>
                : <span className="text-gray-400">Not selected</span>}
            </span>
          </div>
          <div className="flex flex-col items-start justify-center w-1/4">
            <span className="font-medium  mb-1">Appointment Type</span>
            <span className="font-semibold text-gray-700">
              {appointmentType
                ? appointmentType === 'Hospital'
                  ? `Hospital${hospital ? ` (${hospital})` : ''}`
                  : appointmentType
                : <span className="text-gray-400">Not selected</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInfoCard;
