import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function DailyAppointmentsViewer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const res = await axiosInstance.get(`/api/appointment?date=${formattedDate}`);
        console.log(`Fetched appointments for ${formattedDate}:`, res.data);
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        toast.error("Failed to fetch appointments for the selected date.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [selectedDate]); // This effect runs whenever the selected date changes

  return (
    <div className="p-6 max-w-2xl border border-gray-200 rounded-lg font-prompt">
      <h1 className="text-2xl font-bold">ตารางนัดหมายประจำวัน</h1>
      <p className="font-light mb-4">ดูตารางเวลาเป็นแบบรายวัน</p>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">เลือกวัน</label>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat="yyyy-MM-dd"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">นัดหมายสำหรับ {selectedDate.toLocaleDateString()}</h2>
        {isLoading ? (
          <p className="text-gray-500">กำลังโหลด...</p>
        ) : (
          <ul className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map(app => (
                <li key={app.id} className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-purple-700">
                      เวลา: {app.startTime} - {app.endTime}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${app.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {app.status === 'CONFIRMED' ? 'ยืนยันแล้ว' : 'รอดำเนินการ'}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">แพทย์:</span> {'Dr. ' + app.Doctor.firstName} {app.Doctor.lastName} 
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">ผู้ป่วย:</span> {app.Patient.firstName} {app.Patient.lastName} 
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">ไม่มีนัดหมายสำหรับวันนี้</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DailyAppointmentsViewer;