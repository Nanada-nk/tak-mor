import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../config/axios.js";

function DoctorAvailabilityPage() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [slotsByDoctor, setSlotsByDoctor] = useState({});
  const [fixedByDoctor, setFixedByDoctor] = useState({});

  // Fetch all doctors on mount
  useEffect(() => {
    axiosInstance.get("/api/doctor")
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Failed to fetch doctors:", err));
  }, []);

  // Fetch slots and fixed availability for each doctor when their date changes
  // useEffect(() => {
  //   if (doctors.length === 0) return;
  //   Promise.all(
  //     doctors.map(doc => {
  //       const dateObj = selectedDates[doc.id] || new Date();
  //       const d = dateObj.toISOString().split('T')[0];
  //       const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, etc.

  //       // Fetch slots for the selected date
  //       const slotsPromise = axiosInstance.get(`/doctor/${doc.id}/slots?date=${d}`)
  //         .then(res => Array.isArray(res.data) ? res.data : [])
  //         .catch(() => []);

  //       // Fetch fixed availability for the selected day of week
  //       const fixedPromise = axiosInstance.get(`/doctor/${doc.id}/availability?dayOfWeek=${dayOfWeek}`)
  //         .then(res => Array.isArray(res.data) ? res.data : [])
  //         .catch(() => []);

  //       return Promise.all([slotsPromise, fixedPromise]).then(([slots, fixed]) => ({
  //         doctorId: doc.id,
  //         slots,
  //         fixed
  //       }));
  //     })
  //   ).then(results => {
  //     const slotsObj = {};
  //     const fixedObj = {};
  //     results.forEach(({ doctorId, slots, fixed }) => {
  //       slotsObj[doctorId] = slots;
  //       fixedObj[doctorId] = fixed;
  //     });
  //     setSlotsByDoctor(slotsObj);
  //     setFixedByDoctor(fixedObj);
  //   });
  // }, [doctors, selectedDates]);

  const fetchSlotsAndAvailability = useRef(
  debounce((doctors, selectedDates, setSlotsByDoctor, setFixedByDoctor) => {
    Promise.all(
      doctors.map(doc => {
        const dateObj = selectedDates[doc.id] || new Date();
        const d = dateObj.toISOString().split('T')[0];
        const dayOfWeek = dateObj.getDay();
        const slotsPromise = axiosInstance.get(`/api/doctor/${doc.id}/slots?date=${d}`)
          .then(res => Array.isArray(res.data) ? res.data : [])
          .catch(() => []);
        const fixedPromise = axiosInstance.get(`/api/doctor/${doc.id}/availability?dayOfWeek=${dayOfWeek}`)
          .then(res => Array.isArray(res.data) ? res.data : [])
          .catch(() => []);
        return Promise.all([slotsPromise, fixedPromise]).then(([slots, fixed]) => ({
          doctorId: doc.id,
          slots,
          fixed
        }));
      })
    ).then(results => {
      const slotsObj = {};
      const fixedObj = {};
      results.forEach(({ doctorId, slots, fixed }) => {
        slotsObj[doctorId] = slots;
        fixedObj[doctorId] = fixed;
      });
      setSlotsByDoctor(slotsObj);
      setFixedByDoctor(fixedObj);
    });
  }, 500)
).current;

useEffect(() => {
  if (doctors.length === 0) return;
  fetchSlotsAndAvailability(doctors, selectedDates, setSlotsByDoctor, setFixedByDoctor);
}, [doctors, selectedDates]);

  return (
    <div className="font-prompt">
      <h1 className="text-2xl font-bold mb-4">Doctor Calendars</h1>
      {doctors.map(doctor => (
        <div key={doctor.id} className="mb-8 border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">
            {doctor.firstName} {doctor.lastName} ({doctor.specialty?.name || "General"})
          </h2>
          {/* Calendar for each doctor */}
          <DatePicker
            inline
            selected={selectedDates[doctor.id] || new Date()}
            onChange={date =>
              setSelectedDates(prev => ({
                ...prev,
                [doctor.id]: date
              }))
            }
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
          {/* Slots for each doctor */}
          <div className="mt-4">
            <h3 className="font-bold mb-2">Available Slots</h3>
            {/* Show DoctorAvailableSlot */}
            {slotsByDoctor[doctor.id] && slotsByDoctor[doctor.id].length > 0 && (
              <>
                <div className="font-semibold text-blue-700 mb-1">Manual/Generated Slots</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {slotsByDoctor[doctor.id].map(slot => (
                    <span key={slot.startTime + slot.endTime} className="px-3 py-1 rounded bg-blue-100 border border-blue-300">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  ))}
                </div>
              </>
            )}
            {/* Show DoctorAvailability */}
            {/* {fixedByDoctor[doctor.id] && fixedByDoctor[doctor.id].length > 0 && (
              <>
                <div className="font-semibold text-green-700 mb-1">Fixed Weekly Slots</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {fixedByDoctor[doctor.id].map(avail => (
                    <span key={avail.startTime + avail.endTime} className="px-3 py-1 rounded bg-green-100 border border-green-300">
                      {avail.startTime} - {avail.endTime}
                    </span>
                  ))}
                </div>
              </>
            )} */}
            {/* If no slots at all */}
            {(!slotsByDoctor[doctor.id] || slotsByDoctor[doctor.id].length === 0) &&
            //  (!fixedByDoctor[doctor.id] || fixedByDoctor[doctor.id].length === 0) && 
             (
              <p className="text-gray-400">No slots available</p>
            )}
          </div>
          <button
            onClick={() => navigate("/booking", { state: { doctorId: doctor.id } })}
            className="btn btn-info text-white"
          >
            จองเลย
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoctorAvailabilityPage;