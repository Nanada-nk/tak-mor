import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import useBookingStore from "../../stores/bookingStore.js";
import StepProgressBar from "../../components/booking/StepProgressBar.jsx";
import DoctorCardDynamic from "../../components/booking/DoctorCardDynamic.jsx";
import SpecialtySelector from "../../components/booking/SpecialtySelector.jsx";
import ServiceSelector from "../../components/booking/ServiceSelector.jsx";
import BookingNavButtons from "../../components/booking/BookingNavButtons.jsx";

function BookingPage() {
  const navigate = useNavigate();
   const location = useLocation();
  const doctorId = location.state?.doctorId;
  const {
    specialty: selectedSpecialty,
    setSpecialty,
    service: selectedService,
    setService,
    hospital: selectedHospital,
    setServicePrice,
  } = useBookingStore();
  const doctorFromState = location.state?.doctor;
  // Use the first specialty from doctorFromState if present, otherwise fallback to selectedSpecialty or ""
  const initialSpecialty = doctorFromState && Array.isArray(doctorFromState.specialties) && doctorFromState.specialties.length > 0
    ? doctorFromState.specialties[0]
    : (selectedSpecialty || "");
  const [localSpecialty, setLocalSpecialty] = useState(initialSpecialty);
  const [localService, setLocalService] = useState(selectedService || "");

  // Always use specialties from doctorFromState if present
  const drJohnSpecialties = useMemo(() => {
    if (doctorFromState && Array.isArray(doctorFromState.specialties) && doctorFromState.specialties.length > 0) {
      return doctorFromState.specialties.map((spec) => ({
        key: spec,
        label: spec,
        title: spec,
        rating: doctorFromState.rating || 5.0
      }));
    }
    // fallback to hardcoded
    return [
      { key: "Psychology", label: "Psychology", title: "Psychologist", rating: 5.0 },
      { key: "Cardiology", label: "Cardiology", title: "Cardiologist", rating: 4.8 },
      { key: "Dermatology", label: "Dermatology", title: "Dermatologist", rating: 4.9 },
      { key: "General", label: "General Medicine", title: "General Practitioner", rating: 4.7 }
    ];
  }, [doctorFromState]);

  // Auto-select the first specialty if none is selected (sync zustand store)
  useEffect(() => {
    if ((!selectedSpecialty || !drJohnSpecialties.some(s => s.key === selectedSpecialty)) && drJohnSpecialties.length > 0) {
      setLocalSpecialty(drJohnSpecialties[0].key);
      setSpecialty(drJohnSpecialties[0].key);
    }
  }, [selectedSpecialty, setSpecialty, drJohnSpecialties]);

  // Sample hospital-service mapping
  const hospitalServices = useMemo(() => ({
    "Springfield Hospital": [
      { name: "Echocardiogram", price: 1200 },
      { name: "Blood Test", price: 500 },
      { name: "X-Ray", price: 800 },
      { name: "Physical Exam", price: 800 },
    ],
    "Evergreen Medical Center": [
      { name: "MRI Scan", price: 3500 },
      { name: "CT Scan", price: 2500 },
      { name: "Ultrasound", price: 1000 },
      { name: "Sleep Study", price: 2000 },
    ],
    "Downtown Health Hub": [
      { name: "Skin Allergy Test", price: 900 },
      { name: "Therapy Session", price: 1200 },
      { name: "Nutrition Consultation", price: 700 },
      { name: "Cholesterol Screening", price: 550 },
    ],
    "Northside Family Hospital": [
      { name: "Vaccination", price: 600 },
      { name: "Vision Test", price: 400 },
      { name: "Heart Stress Test", price: 1500 },
    ],
    "Westside Wellness": [
      { name: "Ultrasound", price: 1000 },
      { name: "Therapy Session", price: 1200 },
      { name: "Nutrition Consultation", price: 700 },
    ],
    "Central Care Hospital": [
      { name: "Blood Test", price: 500 },
      { name: "Physical Exam", price: 800 },
      { name: "Cholesterol Screening", price: 550 },
    ],
  }), []);

  // Only show services for the selected hospital
  const services = useMemo(() => {
    if (selectedHospital && hospitalServices[selectedHospital]) {
      return hospitalServices[selectedHospital];
    }
    // If no hospital selected, show empty or all
    return [];
  }, [selectedHospital, hospitalServices]);

  // Handle specialty change (no longer resets service)
  // Specialty only updates localSpecialty and store
  const handleSpecialtyChange = (specKey) => {
    setLocalSpecialty(specKey);
    setSpecialty(specKey);
  };

  // Handle service change
  const handleServiceClick = (serviceName) => {
    if (localService === serviceName) {
      setLocalService("");
      setService("");
      setServicePrice(0);
    } else {
      setLocalService(serviceName);
      setService(serviceName);
      // Find the selected service price
      const selected = services.find(s => s.name === serviceName);
      setServicePrice(selected ? selected.price : 0);
    }
  };

  // ...existing code...

  // Find selected specialty info
  const selectedSpecialtyObj = drJohnSpecialties.find(s => s.key === localSpecialty) || drJohnSpecialties[0];
  const doctor = doctorFromState
    ? {
        ...doctorFromState,
        specialties: doctorFromState.specialties,
        title: selectedSpecialtyObj.title,
        rating: selectedSpecialtyObj.rating,
      }
    : {
        name: "Dr.John Nontakaeng",
        specialties: drJohnSpecialties.map(s => s.key),
        title: selectedSpecialtyObj.title,
        rating: selectedSpecialtyObj.rating,
        address: "742 Evergreen Terrace, Springfield",
        img: "https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp"
      };

  const steps = [
    { label: "Appointment Type", dataContent: "✓" },
    { label: "Specialty", dataContent: "2" },
    { label: "Date & Time", dataContent: "3" },
    { label: "Patient Information", dataContent: "4" },
    { label: "Payment", dataContent: "5" },
    { label: "Confirmation", dataContent: "6" },
  ];
  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
      <StepProgressBar steps={steps} currentStep={1} />
      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        <div className="h-fit mt-4 flex flex-col items-center justify-center">
          <DoctorCardDynamic
            name={doctor.name}
            title={localSpecialty}
            rating={doctor.rating}
            address={doctor.address}
            img={doctor.img}
          />
        </div>
        <div className="h-[360px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-col p-3 bg-white border border-gray-200 h-full min-h-[275px] w-19/20 rounded-2xl">
            <SpecialtySelector
              specialties={Array.isArray(doctor.specialties) && doctor.specialties.length > 0
                ? doctor.specialties.map((spec) => ({ key: spec, label: spec, title: spec }))
                : drJohnSpecialties}
              selected={localSpecialty}
              onSelect={handleSpecialtyChange}
            />
            <ServiceSelector
              services={services}
              selected={localService}
              onSelect={handleServiceClick}
              disabled={!localSpecialty}
            />
          </div>
        </div>
        <div className="h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate("/appointment") } className="btn btn-error">{"<"} Back</button>
          <button onClick={() => navigate("/bookingdatetime", { state: { doctorId: doctorId } })} className="btn btn-primary">Select Date & Time {" >"}</button>
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
