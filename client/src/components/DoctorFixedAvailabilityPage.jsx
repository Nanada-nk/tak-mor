import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.js";
import { toast } from "react-toastify";

// Generate 30-minute intervals from 09:00 to 19:30
const generate30MinTimeOptions = () => {
  const times = [];
  // Ensure the loop goes up to the last valid 30-minute slot before 20:00
  for (let hour = 9; hour < 20; hour++) {
    times.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour < 19) { // Don't add 19:30 if the end time is 20:00
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
  }
  return times;
};

const dayOfWeekOptions = [
  { value: 0, label: "วันอาทิตย์" },
  { value: 1, label: "วันจันทร์" },
  { value: 2, label: "วันอังคาร" },
  { value: 3, label: "วันพุธ" },
  { value: 4, label: "วันพฤหัสบดี" },
  { value: 5, label: "วันศุกร์" },
  { value: 6, label: "วันเสาร์" },
];

function DoctorFixedAvailabilityPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(0); // 0 = Sunday
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [message, setMessage] = useState(null);

  const timeOptions = generate30MinTimeOptions();

  useEffect(() => {
    // Fetch the list of doctors when the component mounts
    axiosInstance.get("/api/doctor")
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Failed to fetch doctors:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || startTime === "" || endTime === "") {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    // Basic validation to ensure start time is before end time
    if (startTime >= endTime) {
      toast.error("เวลาเริ่มต้นต้องก่อนเวลาสิ้นสุด");
      return;
    }

    const data = {
      dayOfWeek,
      startTime,
      endTime,
    };

    try {
      await axiosInstance.post(`/api/doctor/${selectedDoctor}/availability`, data);
      toast.success("เพิ่มเวลาแบบประจำสำเร็จแล้ว");
      setMessage("เพิ่มเวลาแบบประจำสำเร็จแล้ว ✅");
    } catch (err) {
      console.error(err);
      toast.error("เพิ่มเวลาแบบประจำล้มเหลว");
      setMessage(err?.response?.data?.error || "เพิ่มเวลาแบบประจำล้มเหลว ❌");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-prompt">
      <h1 className="text-2xl font-bold">เพิ่ม ตารางเวลาว่างการนัดหมายแพทย์ แบบประจำ</h1>
       <p className="font-light mb-4">เลือกแพทย์ เลือกวันในสัปดาห์ ระบบบจะลงบันทึกเวลาว่างของวันนั้นใน 1 สัปดาห์ ไม่สามารถเลือกเวลาเริ่มต้นมากกว่าเวลาส้นสุดได้</p>
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
        <label className="block mb-1 font-semibold">เลือกวันในสัปดาห์</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={dayOfWeek}
          onChange={e => setDayOfWeek(Number(e.target.value))}
        >
          {dayOfWeekOptions.map(day => (
            <option key={day.value} value={day.value}>{day.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">เวลาเริ่มต้น</label>
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
        <div className="w-1/2">
          <label className="block mb-1 font-semibold">เวลาสิ้นสุด</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          >
            {timeOptions.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

 <div className="mb-4">
        <span className="font-semibold">เวลาที่ถูกบันทึก </span>{" "}
        <p className=" px-2 bg-green-300 py-2 rounded text-center font-semibold">
       {startTime} - {endTime}

        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="btn text-xl btn-primary w-full"
      >
        เพิ่มตารางเวลาว่างแบบประจำ
      </button>

      {message && <p className="mt-4 text-center p-4 text-md bg-amber-200">{message}</p>}
    </div>
  );
}

export default DoctorFixedAvailabilityPage;