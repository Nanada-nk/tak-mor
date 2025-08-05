import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.js";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DoctorSlotDeletion() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {

    axiosInstance.get("/api/doctor")
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Failed to fetch doctors:", err));
  }, []);

  useEffect(() => {
   
    const fetchSlots = async () => {
      if (!selectedDoctor || !selectedDate) {
        setTimeSlots([]);
        return;
      }
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const res = await axiosInstance.get(`/api/doctor/${selectedDoctor}/slots?date=${formattedDate}`);
        setTimeSlots(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor slots:", err);
        toast.error("Failed to fetch doctor slots.");
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  const handleDeleteSlot = async (slot) => {
 
    if (window.confirm(`Are you sure you want to delete this slot from ${slot.startTime} to ${slot.endTime}?`)) {
      try {
        if (slot.source === 'generated') {
          
          await axiosInstance.delete(`/api/doctor/fixed-availability/${slot.id}`);
          toast.success("ตารางเวลาว่างแบบประจำถูกลบเรียบร้อยแล้ว!");
          setMessage("ตารางเวลาว่างแบบประจำถูกลบเรียบร้อยแล้ว!");
        } else if (slot.source === 'manual') {
         
          await axiosInstance.delete(`/api/doctor/manual-slot/${slot.id}`);
          toast.success("ตารางเวลาว่างแบบครั้งเดียวถูกลบเรียบร้อยแล้ว!");
          setMessage("ตารางเวลาว่างแบบครั้งเดียวถูกลบเรียบร้อยแล้ว!");
        }

        
        setTimeSlots(prev => prev.filter(s => s.id !== slot.id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete the slot.");
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto font-prompt">
      <h1 className="text-2xl font-bold mb-4">จัดการตารางเวลาว่างของแพทย์ (ลบ)</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">เลือกแพทย์</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedDoctor || ""}
          onChange={e => setSelectedDoctor(e.target.value)}
        >
          <option value="">เลือกแพทย์</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>
              {'Dr. ' + doc.firstName} {doc.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">เลือกวัน</label>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat="yyyy-MM-dd"
          className="w-full border rounded px-3 py-2"
          minDate={new Date()}
        />
      </div>

      {selectedDoctor && selectedDate && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">ตารางเวลาว่างสำหรับ {selectedDate.toLocaleDateString()}</h2>
          <ul className="space-y-2">
            {timeSlots.length > 0 ? (
              timeSlots.map(slot => (
                <li key={`${slot.source}-${slot.id}-${slot.startTime}`} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                  <span>
                    Time: {slot.startTime} - {slot.endTime} ({slot.source === 'manual' ? 'แบบรายครั้ง' : 'แบบประจำ'})
                  </span>
                  <button
                    onClick={() => handleDeleteSlot(slot)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">ไม่มีตารางเวลาสำหรับวันนี้</p>
            )}
          </ul>
        </div>
      )}

      {message && <p className="mt-4 text-center p-4 text-md bg-amber-200">{message}</p>}
    </div>
  );
}

export default DoctorSlotDeletion;