import { PinIcon, StarIcon } from "../../components/icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useBookingStore from "../../stores/bookingStore";


function BookingPage() {
  const navigate = useNavigate();
   const location = useLocation();
  const doctorId = location.state?.doctorId;
  const {
    specialty: selectedSpecialty,
    setSpecialty,
    service: selectedService,
    setService,
  } = useBookingStore();
  const [localSpecialty, setLocalSpecialty] = useState(selectedSpecialty || "");
  const [localService, setLocalService] = useState(selectedService || "");
  const services = [
    { name: "Echocardiogram", price: 1200 },
    { name: "Blood Test", price: 500 },
    { name: "X-Ray", price: 800 },
    { name: "MRI Scan", price: 3500 },
    { name: "CT Scan", price: 2500 },
    { name: "Ultrasound", price: 1000 },
    { name: "Skin Allergy Test", price: 900 },
    { name: "Heart Stress Test", price: 1500 },
    { name: "Therapy Session", price: 1200 },
    { name: "Vaccination", price: 600 },
    { name: "Nutrition Consultation", price: 700 },
    { name: "Sleep Study", price: 2000 },
    { name: "Physical Exam", price: 800 },
    { name: "Cholesterol Screening", price: 550 },
    { name: "Vision Test", price: 400 },
  ];
  // Handle specialty change
  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    setLocalSpecialty(value);
    setSpecialty(value);
    setLocalService("");
    setService("");
  };

  // Handle service change
  const handleServiceClick = (serviceName) => {
    setLocalService(serviceName);
    setService(serviceName);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
      <div className="h-1/7 w-full flex items-center justify-center">
        <ul className="steps h-full">
          <li data-content="1" className="step step-primary">
            Specialty
          </li>
          <li data-content="2" className="step">
            Appointment Type
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
                  src="https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp"
                  alt="doctor"
                />
              </div>
            </div>
            <div className=" w-4/5 p-1 flex flex-col justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-start ">
                  <div className="font-bold">Dr.John Nontakaeng</div>
                  <div className="text-blue-700 ">Psychologist</div>
                </div>
                <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
                  <StarIcon className="h-4" />
                  <div className="text-white text-sm">5.0</div>
                </div>
              </div>

              <div className="flex items-center justify-start">
                <PinIcon className="h-5" />
                <div className="text-gray-500">
                  742 Evergreen Terrace, Springfield
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[360px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-col p-3 bg-white border border-gray-200 h-full min-h-[275px] w-19/20 rounded-2xl">
            <div className="flex flex-col gap-1 items-start border-b border-gray-200 pb-2 mb-2">
              <h1>Select Specialty</h1>
              <fieldset className="fieldset w-full">
                <select
                  value={localSpecialty || ""}
                  onChange={handleSpecialtyChange}
                  className="select"
                >
                  <option value="" disabled={true}>Select a Specialty</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </fieldset>
            </div>

              <div>Services</div>
              <div className="flex flex-col items-start w-full overflow-auto">
              <div className="grid grid-cols-3 gap-4 mt-2 mb-2 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {services.map((service) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate(-1) } className="btn btn-error">{"<"} Back</button>
          <button onClick={() => navigate("/appointment", { state: { doctorId: doctorId } })} className="btn btn-primary">Select Appointment Type {" >"}</button>
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
