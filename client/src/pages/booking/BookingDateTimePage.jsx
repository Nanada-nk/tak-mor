import { useNavigate, useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { PinIcon, StarIcon } from "../../components/icons";
import useBookingStore from "../../stores/bookingStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../config/axios.js";

function BookingDateTimePage() {
  // const { doctorId } = useParams();
   const location = useLocation();
  const doctorId = location.state?.doctorId;
  const navigate = useNavigate();
  const {
    specialty,
    service,
    selectedDate,
    selectedTime,
    appointmentType,
    clinic,
    setSelectedDate,
    setSelectedTime
  } = useBookingStore();

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (!selectedDate || !doctorId) return;
    const d = selectedDate.toISOString().split('T')[0];
    axiosInstance.get(`/doctor/${doctorId}/slots?date=${d}`)
    .then(res => {
      console.log("API slots response:", res.data);
      setTimeSlots(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Failed to fetch slots:", err);
        setTimeSlots([]);
      });
    }, [selectedDate, doctorId]);
    
   
  const grouped = ["Morning", "Afternoon", "Evening"].map(period => ({
    period,
    slots: timeSlots.filter(s => {
      const h = Number(s.startTime.split(":")[0]);
      if (period === "Morning") return h < 12;
      if (period === "Afternoon") return h >= 12 && h < 17;
      return h >= 17;
    })
  }));

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setSelectedTime(slot.startTime);
  };
 console.log("selectedDate:", selectedDate, "doctorId:", doctorId);
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
            <div className="mt-2 w-full border-gray-200 pt-2 px-4">
              <div className="flex flex-row justify-between gap-4 text-sm">
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">Specialty</span>
                  <span className="font-semibold text-gray-700">{specialty || <span className="text-gray-400">Not selected</span>}</span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">Service</span>
                  <span className="font-semibold text-gray-700">{service || <span className="text-gray-400">Not selected</span>}</span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">Date & Time</span>
                  <span className="font-semibold text-gray-700">
                    {selectedDate && selectedTime
                      ? <span className="text-gray-600">{`${selectedDate.toLocaleDateString()} ${selectedTime}`}</span>
                      : <span className="text-gray-400">Not selected</span>}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">Appointment Type</span>
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
            <div className="w-1/2">
              <DatePicker
                inline
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                  setSelectedSlot(null);
                }}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
              />
            </div>
            <div className="w-1/2 p-4 overflow-auto">
              {grouped.map(({ period, slots }) => (
                <div key={period} className="mb-4">
                  <h4 className="font-bold text-lg mb-2">{period}</h4>
                  {slots.length === 0 ? <p className="text-gray-400">--</p> : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map(s => (
                        <button key={s.startTime} onClick={() => handleSlotSelect(s)}
                          className={`px-3 py-1 rounded-md border ${selectedSlot?.startTime === s.startTime ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                        >
                          {s.startTime}-{s.endTime}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {selectedSlot && (
                <p className="mt-4 text-sm text-green-700">
                  Selected: {selectedSlot.startTime} - {selectedSlot.endTime} on {selectedDate.toISOString().split('T')[0]}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate(-1)} className="btn btn-error">{"< "} Back</button>
          <button disabled={!selectedSlot} onClick={() => navigate("/patientinfo")} className="btn btn-primary">Add Basic Information {" >"}</button>
        </div>
      </div>
    </div>
  );
}

export default BookingDateTimePage;