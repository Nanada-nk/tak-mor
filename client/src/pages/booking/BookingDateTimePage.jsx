import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { PinIcon, StarIcon } from "../../components/icons/index.jsx";
import useBookingStore from "../../stores/bookingStore.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../config/axios.js";
import BookingNavButtons from "../../components/booking/BookingNavButtons.jsx";

function BookingDateTimePage() {
  const navigate = useNavigate();
  const doctor = useBookingStore((state) => state.doctorDetails);
  const {
    specialty,
    service,
    selectedDate,
    selectedTime,
    appointmentType,
    hospital,
    setSelectedDate,
    setSelectedTime,
    setStartDateTime,
    setEndDateTime,
  } = useBookingStore();

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) return alert("Select date and time");

    const startDateTime = new Date(
      `${selectedDate}T${selectedSlot.startTime}:00`
    );
    const endDateTime = new Date(`${selectedDate}T${selectedSlot.endTime}:00`);

    // Set to global state
    setStartDateTime(startDateTime.toISOString());
    setEndDateTime(endDateTime.toISOString());

    navigate("/patientinfo");
  };

    const handlePrevious = () => {
    navigate('/booking');
  };

  const doctorId = useBookingStore((state) => state.doctorId);

  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Convert stored string to Date object for usage
  const dateObj = selectedDate ? new Date(selectedDate) : null;

  useEffect(() => {
    if (!selectedDate || !doctorId) return;

    const d = new Date(selectedDate).toISOString().split("T")[0]; // format date string
    axiosInstance
      .get(`/api/doctor/${doctorId}/slots?date=${d}`)
      .then((res) => {
        console.log("API slots response:", res.data);
        setTimeSlots(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch slots:", err);
        setTimeSlots([]);
      });
  }, [selectedDate, doctorId]); // ✅ use selectedDate (string) here

  const grouped = ["เช้า", "กลางวัน", "เย็น"].map((period) => ({
    period,
    slots: timeSlots.filter((s) => {
      const h = Number(s.startTime.split(":")[0]);
      if (period === "เช้า") return h < 12;
      if (period === "กลางวัน") return h >= 12 && h < 17;
      return h >= 17;
    }),
  }));

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setSelectedTime(slot.startTime);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-full font-prompt">
      <div className="h-1/7 w-full flex items-center justify-center">
        <ul className="steps h-full mb-6">
          <li data-content="✓" className="step step-primary step-success">
            รูปแบบการนัดหมาย
          </li>
          <li data-content="✓" className="step step-primary step-success">
            เลือกเฉพาะทาง
          </li>
          <li data-content="3" className="step step-primary">
           วันเวลา นัดหมาย
          </li>
          <li data-content="4" className="step">
            ข้อมูลส่วนตัว
          </li>
          <li data-content="5" className="step">
           ชำระเงิน
          </li>
          <li data-content="6" className="step">
            ยืนยันสำเร็จ
          </li>
        </ul>
      </div>

      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        <div className="h-fit mt-4 flex flex-col items-center justify-center">
          <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex flex-col rounded-2xl">
            <div className="flex w-full">
              <div className="w-1/5 avatar flex items-center justify-center">
                <div className="w-25 rounded-full">
                  <img
                    src={doctor.Account.profilePictureUrl || "https://via.placeholder.com/150"}
                    alt="doctor"
                  />
                </div>
              </div>
              <div className="w-4/5 p-1 flex flex-col justify-between items-start">
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-start "> 
                    <div className="font-bold text-2xl">{'Dr. ' + doctor.firstName + " " + doctor.lastName}</div>
                    <div className="text-blue-700 ">{doctor?.specialties?.[0]?.Specialty?.name}</div>
                  </div>
                  <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
                    <StarIcon className="h-4" />
                    <div className="text-white text-sm">5.0</div>
                  </div>
                </div>
                <div className="flex items-center justify-start">
                  <PinIcon className="h-5" />
                  <div className="text-gray-500">
                    {doctor.address || '742 Evergreen Terrace, Springfield'}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 w-full border-gray-200 pt-2 px-4">
              <div className="flex flex-row justify-between gap-4 text-sm">
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">สาขา เฉพาะทาง</span>
                  <span className="font-semibold text-gray-700">
                    {specialty || (
                      <span className="text-gray-400">ไม่ได้เลือก</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">บริการ</span>
                  <span className="font-semibold text-gray-700">
                    {service || (
                      <span className="text-gray-400">ไม่ได้เลือก</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">วันที่ เวลา</span>
                  <span className="font-semibold text-gray-700">
                    {dateObj && selectedTime ? (
                      <span className="text-gray-600">{`${dateObj.toLocaleDateString()} ${selectedTime}`}</span>
                    ) : (
                      <span className="text-gray-400">ไม่ได้เลือก</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center w-1/4">
                  <span className="font-medium mb-1">ประเภท การนัดหมาย</span>
                  <span className="font-semibold text-gray-700">
                    {appointmentType ? (
                      appointmentType === "Hospital" ? (
                        `Hospital${hospital ? ` (${hospital})` : ""}`
                      ) : (
                        appointmentType
                      )
                    ) : (
                      <span className="text-gray-400">ไม่ได้เลือก</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[400px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-col p-3 bg-white border py-4 h-full border-gray-200 w-19/20 rounded-2xl">
          <h2 className="font-semibold text-xl my-4 text-center w-full">กรุณาเลือกวันเวลานัดหมาย</h2>
          <div className="w-full flex flex-row items-center">
            <div className="w-1/2 flex ml-12">
              <DatePicker
                inline
                selected={dateObj}
                onChange={(date) => {
                  const isoDate = date.toISOString().split("T")[0]; // Format to string
                  setSelectedDate(isoDate);
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
                  {slots.length === 0 ? (
                    <p className="text-gray-400">--</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {slots.map((s) => (
                        <button
                          key={s.startTime}
                          onClick={() => handleSlotSelect(s)}
                          className={`px-3 py-1 rounded-md border ${
                            selectedSlot?.startTime === s.startTime
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                          }`}
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
                  Selected: {selectedSlot.startTime} - {selectedSlot.endTime} on{" "}
                  {dateObj.toISOString().split("T")[0]}
                </p>
              )}
            </div>
          </div>
          </div>
        </div>

            <div className="flex justify-between items-center px-8">
        <BookingNavButtons
        onBack={handlePrevious}
        onNext={handleNext}
        title='กรอกข้อมูลส่วนตัว'
      />
            </div>

      </div>
    </div>
  );
}

export default BookingDateTimePage;
