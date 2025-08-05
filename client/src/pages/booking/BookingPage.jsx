import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import useBookingStore from "../../stores/bookingStore.js";
import StepProgressBar from "../../components/booking/StepProgressBar.jsx";
import DoctorCardDynamic from "../../components/booking/DoctorCardDynamic.jsx";
import SpecialtySelector from "../../components/booking/SpecialtySelector.jsx";
import ServiceSelector from "../../components/booking/ServiceSelector.jsx";
import BookingNavButtons from "../../components/booking/BookingNavButtons.jsx";

function BookingPage() {
  const navigate = useNavigate();
  
  const doctor = useBookingStore(state => state.doctorDetails);
  const {
    specialty: selectedSpecialty,
    setSpecialty,
    service: selectedService,
    setService,
    setServicePrice
  } = useBookingStore();

 

  // Fetch doctor info from backend

console.log('doctor!!!!!!!!!', doctor)
  // Derive specialties
  const specialties = useMemo(() => {
    if (!doctor?.specialties) return [];
    return doctor.specialties.map((spec) => ({
      key: spec.Specialty.name,
      label: spec.Specialty.name,
      title: spec.Specialty.name,
      rating: doctor.rating || 5.0,
    }));
  }, [doctor]);

  // Dummy services - replace with dynamic data if needed
  const services = useMemo(() => {
    return [
      { name: "อารการทั่วไป", price: 500 },
      { name: "ปรึกษา ด้านจิตเวช", price: 900 },
      { name: "ตรวจสุขภาพ", price: 1500 },
      { name: "ตรวจทดสอบอาการแพ้ผิวหนัง", price: 800 },
    ];
  }, []);

  const handleServiceChange = (serviceName) => {
    const foundService = services.find(s => s.name === serviceName);
    if (foundService) {
      setService(foundService.name);
      setServicePrice(foundService.price);
    }
  };

  const handleNext = () => {
    if (!selectedSpecialty || !selectedService) {
      alert("Please select both specialty and service.");
      return;
    }
    navigate("/bookingdatetime");
  };

  const handlePrevious = () => {
    navigate('/appointment');
  };

    const steps = [
    { label: "รูปแบบการนัดหมาย", dataContent: "✓" },
    { label: "เลือกเฉพาะทาง", dataContent: "2" },
    { label: "วันเวลา นัดหมาย", dataContent: "3" },
    { label: "ข้อมูลส่วนตัว", dataContent: "4" },
    { label: "ชำระเงิน", dataContent: "5" },
    { label: "ยืนยันสำเร็จ", dataContent: "6" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <StepProgressBar steps={steps} currentStep={1} />

      <div className="flex flex-col items-baseline mb-6 bg-gray-100 p-4 rounded-2xl shadow-md">
      {doctor ? (
        <DoctorCardDynamic 
          name={'Dr. ' + doctor.firstName + " " + doctor.lastName}
            title={doctor.specialties?.[0]?.Specialty?.name || "General Practitioner"}
            rating={doctor.rating || 5.0}
            address={doctor.address || "Not available"}
            img={doctor.Account.profilePictureUrl} />
      ) : (
        <div className="text-center text-gray-500 mb-6">Loading doctor info...</div>
      )}

      <div className="my-2 p-4 rounded-lg w-full bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-2">เลือกสาขา เฉพาะทาง</h2>
        <SpecialtySelector
          specialties={specialties}
          selected={selectedSpecialty}
          onSelect={setSpecialty}
        />
      </div>

      <div className="my-2 p-4 rounded-lg w-full bg-white shadow-sm">
        <h2 className="text-lg font-semibold ml-2  mb-2">เลือกบริการ</h2>
        <ServiceSelector
          services={services}
          selected={selectedService}
          onChange={handleServiceChange}
        />
      </div>

      <BookingNavButtons
        onBack={handlePrevious}
        onNext={handleNext}
        title='เลือกวันและเวลา'
      />
    </div>
    </div>
  );
}

export default BookingPage;



