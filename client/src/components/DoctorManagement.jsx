import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../config/axios.js";
import { toast } from "react-toastify";

// Generate 30-minute intervals from 09:00 to 19:30
const generate30MinTimeOptions = () => {
  const times = [];
  for (let hour = 9; hour < 20; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    times.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return times;
};

function DoctorManagementPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [message, setMessage] = useState(null);

  const timeOptions = generate30MinTimeOptions();

  useEffect(() => {
    axiosInstance.get("/api/doctor")
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Failed to fetch doctors:", err));
  }, []);

  const getEndTime = (startTime) => {
    const [sh, sm] = startTime.split(":").map(Number);
    const end = new Date();
    end.setHours(sh);
    end.setMinutes(sm + 30);
    return `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !startTime || !selectedDate) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      setMessage("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    const data = {
      availableDate: selectedDate.toISOString().split("T")[0],
      startTime,
      endTime: getEndTime(startTime),
    };

    try {
      const res = await axiosInstance.post(`/api/doctor/${selectedDoctor}/slots`, data);
      toast.success("เพิ่มเวลาสำเร็จแล้ว");
      setMessage("เพิ่มเวลาสำเร็จแล้ว ✅");
    } catch (err) {
      console.error(err);
      toast.error("เพิ่มเวลาล้มเหลว");
      setMessage(err?.response?.data?.error || "เพิ่มเวลาล้มเหลว ❌");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-prompt">
      <h1 className="text-2xl font-bold ">เพิ่ม ตารางเวลาว่างการนัดหมายแพทย์ แบบรายครั้ง</h1>
      <p className="font-light mb-4">เลือกแพทย์ เลือกวันเวลา (ระบบจะจองไว้เป็นทุก 30 นาที)</p>
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
              {'Dr. ' + doc.firstName} {doc.lastName} ({doc.specialty?.name})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">เลือกวัน</label>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">เลือกเวลา (30 นาทีต่อครั้ง)</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        >
          {timeOptions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <span className="font-semibold">เวลาที่ถูกบันทึก </span>{" "}
        <p className=" px-2 bg-green-300 py-2 rounded text-center font-semibold">
        {startTime} - {getEndTime(startTime)}

        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-primary text-xl w-full"
      >
        เพิ่มเวลา
      </button>

      {message && <p className="mt-4 text-center p-4 text-md bg-amber-200">{message}</p>}
    </div>
  );
}

export default DoctorManagementPage;
