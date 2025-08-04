import DoctorCardDynamic from "../../components/booking/DoctorCardDynamic.jsx";
import { ClinicIcon, VideoCallIcon, AudioCallIcon, ChatIcon } from "../../components/icons/index.jsx";
import { useNavigate, useLocation } from "react-router";
import useBookingStore from "../../stores/bookingStore.js";
import { useState, useEffect } from "react";
import StepProgressBar from "../../components/booking/StepProgressBar.jsx";
import AppointmentTypeSelector from "../../components/booking/AppointmentTypeSelector.jsx";
import HospitalSelector from "../../components/booking/HospitalSelector.jsx";
import NextButton from "../../components/booking/NextButton.jsx";
import axios from 'axios'


function AppointmentTypePage() {
  const [showHospitalWarning, setShowHospitalWarning] = useState(false);
  const appointmentTypes = [
    { label: "Hospital", icon: ClinicIcon },
    { label: "Video Call", icon: VideoCallIcon },
    { label: "Audio Call", icon: AudioCallIcon },
    { label: "Chat", icon: ChatIcon }
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const {
    appointmentType,
    setAppointmentType,
    hospital,
    setHospital,
    setDoctorDetails
  } = useBookingStore();
  
  const doctorId = useBookingStore(state => state.doctorId);

  const [doctor, setDoctor] = useState(null);

useEffect(() => {
  if (!doctorId) return;
  axios.get(`http://localhost:9090/api/doctor/${doctorId}`)
    .then(res => {setDoctor(res.data),setDoctorDetails(res.data);})

    .catch(err => console.error("Failed to fetch doctor:", err));
}, [doctorId]);
 console.log('log doctor',doctor)

 
  // Handle appointment type change
  const handleAppointmentTypeClick = (typeLabel) => {
    setAppointmentType(typeLabel);
    if (typeLabel !== "Hospital") {
      setHospital("");
    }
  };

  // Handle hospital change
  const handleHospitalClick = (hospitalName) => {
    setHospital(hospitalName);
  };

  const handleNextClick = () => {
    if (appointmentType === "Hospital" && !hospital) {
      setShowHospitalWarning(true);
      setTimeout(() => setShowHospitalWarning(false), 2000);

      return;
    }
    navigate("/booking");
  };

  const steps = [
    { label: "รูปแบบการนัดหมาย", dataContent: "1" },
    { label: "เลือกเฉพาะทาง", dataContent: "2" },
    { label: "วันเวลา นัดหมาย", dataContent: "3" },
    { label: "ข้อมูลส่วนตัว", dataContent: "4" },
    { label: "ชำระเงิน", dataContent: "5" },
    { label: "ยืนยันสำเร็จ", dataContent: "6" },
  ];


  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-full">
      <StepProgressBar steps={steps} currentStep={0} />
      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        <div className="h-fit mt-4 flex flex-col items-center justify-center">
          {doctor && (
  <DoctorCardDynamic
    name={`Dr. ${doctor.firstName} ${doctor.lastName}`}
    title={doctor?.specialties?.[0]?.Specialty?.name || doctor.title || ""}
    rating={doctor.rating || 5}
    address={doctor.address || "N/A"}
    img={doctor.Account.profilePictureUrl || "https://via.placeholder.com/150"}
  />
)}
        </div>
        <div className=" h-[360px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-col p-3 bg-white border border-gray-200 h-full min-h-[275px] w-19/20 rounded-2xl">
            <AppointmentTypeSelector
              appointmentTypes={appointmentTypes}
              appointmentType={appointmentType}
              onSelect={handleAppointmentTypeClick}
            />
            {appointmentType === "Hospital" && (
              <HospitalSelector hospital={hospital} onSelect={handleHospitalClick} />
            )}
          </div>
        </div>
        <NextButton
          onClick={handleNextClick}
          disabled={!appointmentType}
          showWarning={showHospitalWarning}
        />
      </div>
    </div>
  );
}
export default AppointmentTypePage;
