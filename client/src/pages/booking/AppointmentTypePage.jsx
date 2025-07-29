import { PinIcon, StarIcon } from "../../components/icons";
import { ClinicIcon, VideoCallIcon, AudioCallIcon, ChatIcon, HomeVisitIcon } from "../../components/icons";
import { useNavigate, useLocation } from "react-router";
import useBookingStore from "../../stores/bookingStore";


function AppointmentTypePage() {
   const location = useLocation();
  const doctorId = location.state?.doctorId;
  const appointmentTypes = [
    { label: "Clinic", icon: ClinicIcon },
    { label: "Video Call", icon: VideoCallIcon },
    { label: "Audio Call", icon: AudioCallIcon },
    { label: "Chat", icon: ChatIcon },
    { label: "Home Visit", icon: HomeVisitIcon }
  ];
  const navigate = useNavigate();
  const {
    appointmentType,
    setAppointmentType,
    clinic,
    setClinic,
  } = useBookingStore();

  // Handle appointment type change
  const handleAppointmentTypeClick = (typeLabel) => {
    setAppointmentType(typeLabel);
    if (typeLabel !== "Clinic") {
      setClinic("");
    }
  };

  // Handle clinic change
  const handleClinicClick = (clinicName) => {
    setClinic(clinicName);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
      <div className="h-1/7 w-full flex items-center justify-center">
        <ul className="steps h-full">
          <li data-content="✓" className="step step-primary step-success">
            Specialty
          </li>
          <li data-content="2" className="step step-primary">
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
        <div className=" h-[360px] flex flex-col items-center pt-4 gap-3">
          <div className="flex flex-col p-3 bg-white border border-gray-200 h-full min-h-[275px] w-19/20 rounded-2xl">
            <div className="flex flex-col gap-1 items-start border-b border-gray-200 pb-2 mb-2">
              <h1>Select Appointment Type</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2 mb-2 w-full">
                {appointmentTypes.map((type) => {
                  const isSelected = appointmentType === type.label;
                  return (
                    <button
                      key={type.label}
                      className={`flex items-center justify-center border rounded-xl px-3 py-2 h-12 w-full shadow-sm transition-all font-semibold text-base
                        ${isSelected
                          ? 'border-blue-700 bg-blue-100 text-blue-700 scale-105 drop-shadow-lg'
                          : 'border-gray-200 bg-white text-gray-800'}`}
                      onClick={() => handleAppointmentTypeClick(type.label)}
                      type="button"
                    >
                      <span className="h-6 w-6 mr-2 flex items-center justify-center">
                        <type.icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-800'}`} />
                      </span>
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

              {appointmentType === "Clinic" && (
                <>
                  <div>Select Clinic</div>
                  <div className="flex flex-col items-start w-full overflow-auto">
                    <div className="grid grid-cols-1 pb-5 gap-4 mt-2 mb-2 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {[{
                        name: "Springfield Clinic",
                        address: "742 Evergreen Terrace, Springfield",
                        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                      }, {
                        name: "Evergreen Medical Center",
                        address: "123 Main St, Springfield",
                        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                      }, {
                        name: "Downtown Health Hub",
                        address: "456 Elm St, Springfield",
                        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd2b?auto=format&fit=crop&w=400&q=80"
                      }, {
                        name: "Northside Family Clinic",
                        address: "789 Oak St, Springfield",
                        img: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=400&q=80"
                      }, {
                        name: "Westside Wellness",
                        address: "321 Pine St, Springfield",
                        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
                      }, {
                        name: "Central Care Clinic",
                        address: "654 Maple St, Springfield",
                        img: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=400&q=80"
                      }].map((clinicObj) => (
                        <button
                          key={clinicObj.name}
                          className={`flex flex-row items-center border rounded-xl px-3 pt-2 h-20 w-full shadow-sm transition-all
                            ${clinic === clinicObj.name
                              ? 'border-blue-700 bg-blue-500 text-white'
                              : 'border-gray-200 bg-white text-gray-800'}`}
                          onClick={() => handleClinicClick(clinicObj.name)}
                          type="button"
                        >
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                            <img src={clinicObj.img} alt={clinicObj.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col items-start flex-grow">
                            <div className={`font-semibold text-base mb-1 ${clinic === clinicObj.name ? 'text-white' : ''}`}>{clinicObj.name}</div>
                            <div className={`text-gray-200 text-sm mb-2 ${clinic === clinicObj.name ? 'text-white opacity-80' : 'text-gray-500'}`}>{clinicObj.address}</div>
                          </div>
                          <div className="flex items-center h-full">
                            {clinic === clinicObj.name && (
                              <span className="text-white font-bold text-xl">&#10003;</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
        <div className="h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate(-1)} className="btn btn-error">{"< "} Back</button>
          <button
            onClick={() => navigate("/bookingdatetime", { state: { doctorId: doctorId } })}
            className="btn btn-primary"
            disabled={
              !appointmentType || (appointmentType === "Clinic" && !clinic)
            }
          >
            Select Date & Time {" >"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AppointmentTypePage;
