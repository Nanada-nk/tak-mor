import { useNavigate } from "react-router";
import { useState } from "react";
import { PinIcon, StarIcon } from "../../components/icons";
import useBookingStore from "../../stores/bookingStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




function BookingDateTimePage() {
  
  const pad = n => String(n).padStart(2, '0');
  // Morning: 08:00-10:15 (10 slots)
  const morningSlots = Array.from({ length: 10 }, (_, i) => {
    const startMinutes = 8 * 60 + i * 15;
    const endMinutes = startMinutes + 15;
    return {
      id: i + 1,
      availableDate: "2025-07-25",
      startTime: `${pad(Math.floor(startMinutes / 60))}:${pad(startMinutes % 60)}`,
      endTime: `${pad(Math.floor(endMinutes / 60))}:${pad(endMinutes % 60)}`,
      isActive: true,
    };
  });
  // Afternoon: 12:00-14:15 (10 slots)
  const afternoonSlots = Array.from({ length: 10 }, (_, i) => {
    const startMinutes = 12 * 60 + i * 15;
    const endMinutes = startMinutes + 15;
    return {
      id: 11 + i,
      availableDate: "2025-07-25",
      startTime: `${pad(Math.floor(startMinutes / 60))}:${pad(startMinutes % 60)}`,
      endTime: `${pad(Math.floor(endMinutes / 60))}:${pad(endMinutes % 60)}`,
      isActive: true,
    };
  });
  // Evening: 17:00-19:15 (10 slots)
  const eveningSlots = Array.from({ length: 10 }, (_, i) => {
    const startMinutes = 17 * 60 + i * 15;
    const endMinutes = startMinutes + 15;
    return {
      id: 21 + i,
      availableDate: "2025-07-25",
      startTime: `${pad(Math.floor(startMinutes / 60))}:${pad(startMinutes % 60)}`,
      endTime: `${pad(Math.floor(endMinutes / 60))}:${pad(endMinutes % 60)}`,
      isActive: true,
    };
  });
  const mockTimeSlots = [
    ...morningSlots,
    ...afternoonSlots,
    ...eveningSlots,
  ];
   
   

  // Store logic for date and time
  const { specialty, appointmentType, clinic, service, setDateTime, dateTime } = useBookingStore();
  const [selectedDate, setSelectedDate] = useState(dateTime?.date || null);
  const [selectedTime, setSelectedTime] = useState(dateTime?.time || null);

  const navigate = useNavigate();
  // Get selected date string in YYYY-MM-DD format (local time, not UTC)
  const selectedDateString = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : null;


  // Filter slots for selected date
  const slotsForDay = mockTimeSlots.filter(slot => slot.availableDate === selectedDateString && slot.isActive);

  // Group slots by period
  const getPeriod = (startTime) => {
    const [hour] = startTime.split(":").map(Number);
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  const periods = ["Morning", "Afternoon", "Evening"];
  const slotsByPeriod = periods.map(period => ({
    period,
    slots: slotsForDay.filter(slot => getPeriod(slot.startTime) === period),
  }));

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setDateTime({ date, time: null });
  };
  // Handle time slot click
  const handleTimeClick = (slot) => {
    setSelectedTime(`${slot.startTime} - ${slot.endTime}`);
    setDateTime({ date: selectedDate, time: `${slot.startTime} - ${slot.endTime}` });
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
      <div className="h-1/7 w-full flex items-center justify-center">
        <ul className="steps h-full">
          <li data-content="✓" className="step step-primary step-success">Specialty</li>
          <li data-content="✓" className="step step-primary step-success">Appointment Type</li>
          <li data-content="3" className="step step-primary">Date & Time</li>
          <li data-content="4" className="step">Patient Information</li>
          <li data-content="5" className="step">Payment</li>
          <li data-content="6" className="step">Confirmation</li>
        </ul>
      </div>
      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        <div className="h-fit mt-4 flex flex-col items-center justify-center">
          <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex flex-col rounded-2xl">
            <div className="flex w-full">
              <div className="w-1/5 avatar flex items-center justify-center">
                <div className="w-25 rounded-full">
                  <img
                    src="https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp"
                    alt="doctor"
                  />
                </div>
              </div>
              <div className="w-4/5 p-1 flex flex-col justify-between items-start">
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-start ">
                    <div className="font-bold">Dr.John Nontakaeng</div>
                    <div className="text-blue-700 ">Psychologist</div>
                  </div>
                  <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
                    <StarIcon className="h-4" />
                    <div className="text-white text-sm">5.0</div>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <PinIcon className="h-5" />
                  <div className="text-gray-500">742 Evergreen Terrace, Springfield</div>
                </div>
              </div>
            </div>
            {/* Main Booking Info Section - Specialty, Service, Date & Time, Appointment Type */}
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
                    {selectedDate && selectedTime
                      ? <span className="text-gray-600">{`${selectedDate.toLocaleDateString()} ${selectedTime}`}</span>
                      : <span className="text-gray-400">Not selected</span>}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium  mb-1">Appointment Type</span>
                  <span className="font-semibold text-gray-700">
                    {appointmentType
                      ? appointmentType === 'Clinic'
                        ? `Clinic${clinic ? ` (${clinic})` : ''}`
                        : appointmentType
                      : <span className="text-gray-400">Not selected</span>}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[300px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-row p-3 bg-white border border-gray-200 h-full w-19/20 rounded-2xl">
            {/* Calendar Section (left) */}
            <div className="border-r border-gray-300 pr-3">
             <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                inline
                calendarClassName="custom-calendar-header"
              />
            </div>
            {/* Time Slot Section (right) */}
            <div className=" w-[550px] flex flex-col  items-center pl-4">
              {slotsByPeriod.map(({ period, slots }) => (
                <div className="w-full mb-2" key={period}>
                  <div className="text-xs font-bold mb-1">{period}</div>
                  <div className="flex flex-wrap gap-2">
                    {slots.length > 0 ? (
                      slots.map(slot => (
                        <button
                          key={slot.id}
                          className={`btn btn-xs w-24${selectedTime === `${slot.startTime} - ${slot.endTime}` ? ' bg-blue-800 text-white' : ''}`}
                          onClick={() => handleTimeClick(slot)}
                          disabled={!selectedDate}
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
          </div>
        </div>
        <div className=" h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate(-1)} className="btn btn-error">{"< "} Back</button>
          <button onClick={() => navigate("/patientinfo")} className="btn btn-primary">Add Basic Information {" >"}</button>
        </div>
      </div>
    </div>
  );
}
export default BookingDateTimePage;