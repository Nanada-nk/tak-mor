
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { PinIcon, StarIcon } from "../../components/icons/index.jsx";
import useBookingStore from "../../stores/bookingStore.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import StepProgressBar from "../../components/booking/StepProgressBar.jsx";
import BookingInfoCard from "../../components/booking/BookingInfoCard.jsx";
import BookingDatePicker from "../../components/booking/BookingDatePicker.jsx";
import BookingTimeSlots from "../../components/booking/BookingTimeSlots.jsx";
import BookingNavButtons from "../../components/booking/BookingNavButtons.jsx";




function BookingDateTimePage() {
  const location = useLocation();
  
  const pad = n => String(n).padStart(2, '0');
  // Morning: 08:00-10:15 (10 slots)
  const morningSlots = Array.from({ length: 5 }, (_, i) => {
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
  const { specialty, appointmentType, hospital, service, setDateTime, dateTime } = useBookingStore();
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

  const steps = [
    { label: "Appointment Type", dataContent: "✓" },
    { label: "Specialty", dataContent: "✓" },
    { label: "Date & Time", dataContent: "3" },
    { label: "Patient Information", dataContent: "4" },
    { label: "Payment", dataContent: "5" },
    { label: "Confirmation", dataContent: "6" },
  ];
  // Prefer doctor from navigation state, fallback to default
  const doctor = location.state?.doctor || {
    name: "Dr.John Nontakaeng",
    title: "Psychologist",
    rating: 5.0,
    img: "https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp",
    ratingIcon: <StarIcon className="h-4" />,
    address: "742 Evergreen Terrace, Springfield",
    addressIcon: <PinIcon className="h-5" />,
  };
  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
      <StepProgressBar steps={steps} currentStep={2} />
      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        <div className="h-fit mt-4 flex flex-col items-center justify-center">
          <BookingInfoCard
            doctor={doctor}
            specialty={specialty}
            service={service}
            date={selectedDate ? selectedDate.toLocaleDateString() : null}
            time={selectedTime}
            appointmentType={appointmentType}
            hospital={hospital}
          />
        </div>
        <div className="h-[300px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-row p-3 bg-white border border-gray-200 h-full w-19/20 rounded-2xl">
            <div className="border-r border-gray-300 pr-3">
              <BookingDatePicker selectedDate={selectedDate} onChange={handleDateChange} />
            </div>
            <BookingTimeSlots
              slotsByPeriod={slotsByPeriod}
              selectedTime={selectedTime}
              onTimeClick={handleTimeClick}
              disabled={!selectedDate}
            />
          </div>
        </div>
        <BookingNavButtons
          onBack={() => navigate("/booking", { state: { doctor } })}
          onNext={() => navigate("/patientinfo", { state: { doctor } })}
          nextLabel="Add Basic Information >"
        />
      </div>
    </div>
  );
}
export default BookingDateTimePage;