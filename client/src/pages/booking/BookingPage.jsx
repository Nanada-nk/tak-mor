import { PinIcon, StarIcon } from "../../components/icons";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import useBookingStore from "../../stores/bookingStore";



function BookingPage() {
  const navigate = useNavigate();
  const {
    specialty: selectedSpecialty,
    setSpecialty,
    service: selectedService,
    setService,
    hospital: selectedHospital,
    setServicePrice,
  } = useBookingStore();
  const [localSpecialty, setLocalSpecialty] = useState(selectedSpecialty || "");
  const [localService, setLocalService] = useState(selectedService || "");

  // Dr.John Nontakaeng with multiple specialties and dynamic fields
  const drJohnSpecialties = [
    {
      key: "Psychology",
      label: "Psychology",
      title: "Psychologist",
      rating: 5.0
    },
    {
      key: "Cardiology",
      label: "Cardiology",
      title: "Cardiologist",
      rating: 4.8
    },
    {
      key: "Dermatology",
      label: "Dermatology",
      title: "Dermatologist",
      rating: 4.9
    },
    {
      key: "General",
      label: "General Medicine",
      title: "General Practitioner",
      rating: 4.7
    }
  ];

  // Auto-select the first specialty if none is selected
  useEffect(() => {
    if (!localSpecialty && drJohnSpecialties.length > 0) {
      setLocalSpecialty(drJohnSpecialties[0].key);
      setSpecialty(drJohnSpecialties[0].key);
    }
  }, [localSpecialty, setSpecialty]);

  // Sample hospital-service mapping
  const hospitalServices = {
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
  };

  // Only show services for the selected hospital
  const services = useMemo(() => {
    if (selectedHospital && hospitalServices[selectedHospital]) {
      return hospitalServices[selectedHospital];
    }
    // If no hospital selected, show empty or all
    return [];
  }, [selectedHospital]);

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
  const doctor = {
    name: "Dr.John Nontakaeng",
    title: selectedSpecialtyObj.title,
    rating: selectedSpecialtyObj.rating,
    address: "742 Evergreen Terrace, Springfield",
    img: "https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp"
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
      <div className="h-1/7 w-full flex items-center justify-center">
        <ul className="steps h-full">
          <li data-content="✓" className="step step-primary step-success">
            Appointment Type
          </li>
          <li data-content="2" className="step step-primary">
            Specialty
          </li>
          <li data-content="3" className="step">
            Date & Time
          </li>
          <li data-content="4" className="step">
            Patient Information
          </li>
          <li data-content="5" className="step">
            Payment
          </li>
          <li data-content="6" className="step">
            Confirmation
          </li>
        </ul>
      </div>
      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        <div className="h-fit mt-4 flex flex-col items-center justify-center">
          <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex rounded-2xl">
            <div className=" w-1/5 avatar flex items-center justify-center">
              <div className="w-25 rounded-full">
                <img
                  src={doctor.img}
                  alt={doctor.label}
                />
              </div>
            </div>
            <div className=" w-4/5 p-1 flex flex-col justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-start ">
                  <div className="font-bold">Dr.John Nontakaeng</div>
                  <div className="text-blue-700 ">{doctor.title}</div>
                </div>
                <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
                  <StarIcon className="h-4" />
                  <div className="text-white text-sm">{doctor.rating}</div>
                </div>
              </div>

              <div className="flex items-center justify-start">
                <PinIcon className="h-5" />
                <div className="text-gray-500">
                  {doctor.address}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[360px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-col p-3 bg-white border border-gray-200 h-full min-h-[275px] w-19/20 rounded-2xl">
            <div className="flex flex-col gap-1 items-start border-b border-gray-200 pb-2 mb-2 w-full">
              <h1>Select Specialty</h1>
              <div className="flex flex-row gap-2 mt-2 w-full flex-wrap justify-start">
                {drJohnSpecialties.map((spec) => (
                  <button
                    key={spec.key}
                    className={`flex items-center justify-center border rounded px-2 py-1 min-h-6 min-w-[80px] shadow-sm transition-all font-normal text-xs
                      ${localSpecialty === spec.key
                        ? 'border-blue-700 bg-blue-100 text-blue-700 scale-105 drop-shadow-lg'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-blue-400 hover:bg-blue-50'}`}
                    onClick={() => handleSpecialtyChange(spec.key)}
                    type="button"
                  >
                    {spec.label}
                  </button>
                ))}
              </div>
            </div>

            <div>Services</div>
            <div className="flex flex-col items-start w-full overflow-auto">
              <div className="grid grid-cols-3 gap-4 mt-2 mb-2 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {services.length === 0 ? (
                  <div className="text-gray-400 col-span-3">No Service Available.</div>
                ) : (
                  services.map((service) => (
                    <button
                      key={service.name}
                      className={`flex flex-row items-center justify-between border rounded-xl px-3 pt-2 h-17 w-full bg-white shadow-sm transition-all ${localService === service.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => handleServiceClick(service.name)}
                      type="button"
                      disabled={!localSpecialty}
                    >
                      <div className="flex flex-col items-start">
                        <div className="font-semibold text-base mb-1">{service.name}</div>
                        <div className="text-gray-500 text-sm mb-2">฿{service.price}</div>
                      </div>
                      <div className="flex items-center h-full">
                        {localService === service.name && (
                          <span className="text-blue-500 font-bold text-xl">&#10003;</span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate("/appointment") } className="btn btn-error">{"<"} Back</button>
          <button onClick={() => navigate("/bookingdatetime")} className="btn btn-primary">Select Date & Time {" >"}</button>
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
