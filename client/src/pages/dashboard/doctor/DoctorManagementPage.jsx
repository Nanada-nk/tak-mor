import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../../config/axios.js";

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

  const handleSubmit = async () => {
    if (!selectedDoctor || !startTime || !selectedDate) {
      setMessage("Please fill all fields");
      return;
    }

    const data = {
      availableDate: selectedDate.toISOString().split("T")[0],
      startTime,
      endTime: getEndTime(startTime),
    };

    try {
      const res = await axiosInstance.post(`/api/doctor/${selectedDoctor}/slots`, data);
      setMessage("Slot added successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.error || "Failed to add slot ❌");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-prompt">
      <h1 className="text-2xl font-bold mb-4">Doctor Slot Manager</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Doctor</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedDoctor || ""}
          onChange={e => setSelectedDoctor(e.target.value)}
        >
          <option value="">-- Select a doctor --</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.firstName} {doc.lastName} ({doc.specialty?.name})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Start Time (30 min slots)</label>
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

      <p className="mb-4">
        <span className="font-semibold">End Time:</span>{" "}
        {getEndTime(startTime)}
      </p>

      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full"
      >
        Add Slot
      </button>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}

export default DoctorManagementPage;
