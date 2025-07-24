import { useNavigate } from "react-router";
import useBookingStore from "../../stores/bookingStore";
import { PinIcon, StarIcon } from "../../components/icons";
import { useState } from "react";
import FormInput from "../../components/FormInput";

function PatientInfoPage() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    emailaddress: '',
    symptoms: '',
    attachment: null,
    reason: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  const navigate = useNavigate();
  const { specialty, appointmentType, clinic, service, dateTime } = useBookingStore();
  const selectedDate = dateTime?.date || null;
  const selectedTime = dateTime?.time || null;
  return (
   <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)]">
         <div className="h-1/7 w-full flex items-center justify-center">
           <ul className="steps h-full">
             <li data-content="✓" className="step step-primary step-success">Specialty</li>
             <li data-content="✓" className="step step-primary step-success">Appointment Type</li>
             <li data-content="✓" className="step step-primary step-success">Date & Time</li>
             <li data-content="4" className="step step-primary">Patient Information</li>
             <li data-content="5" className="step">Payment</li>
             <li data-content="6" className="step">Confirmation</li>
           </ul>
         </div>
         <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
           <div className="h-fit mt-4 flex flex-col items-center justify-center">
             <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex flex-col rounded-2xl">
               <div className="flex w-full">
                 <div className="w-1/5 avatar flex items-center justify-center">
                   <div className="w-25 rounded-full">
                     <img
                       src="https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp"
                       alt="doctor"
                     />
                   </div>
                 </div>
                 <div className="w-4/5 p-1 flex flex-col justify-between items-start">
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
                     <div className="text-gray-500">742 Evergreen Terrace, Springfield</div>
                   </div>
                 </div>
               </div>
               {/* Main Booking Info Section - Specialty, Service, Date & Time, Appointment Type */}
               <div className="mt-2 w-full border-gray-200 pt-2 px-4">
                 <div className="flex flex-row justify-between gap-4 text-sm">
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">Specialty</span>
                     <span className="font-semibold text-gray-700">{specialty || <span className="text-gray-400">Not selected</span>}</span>
                   </div>
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">Service</span>
                     <span className="font-semibold text-gray-700">{service || <span className="text-gray-400">Not selected</span>}</span>
                   </div>
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">Date & Time</span>
                     <span className="font-semibold text-gray-700">
                       {selectedDate && selectedTime
                         ? <span className="text-gray-600">{`${selectedDate.toLocaleDateString()} ${selectedTime}`}</span>
                         : <span className="text-gray-400">Not selected</span>}
                     </span>
                   </div>
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">Appointment Type</span>
                     <span className="font-semibold text-gray-700">
                       {appointmentType
                         ? appointmentType === 'Clinic'
                           ? `Clinic${clinic ? ` (${clinic})` : ''}`
                           : appointmentType
                         : <span className="text-gray-400">Not selected</span>}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="h-[300px] flex flex-col items-center pt-4 gap-3">
             <div className="flex flex-row p-3 bg-white border border-gray-200 h-full w-19/20 rounded-2xl">
                <form className="w-full flex flex-col gap-5" encType="multipart/form-data">
                <div className="flex justify-between gap-2 items-start pt-2 mx-2">
                   <FormInput
                    label="First Name"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    label="Last Name"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    label="Phone Number"
                    name="phonenumber"
                    value={form.phonenumber}
                    onChange={handleInputChange}
                    required
                  />
                  <FormInput
                    label="Email Address"
                    name="emailaddress"
                    value={form.emailaddress}
                    onChange={handleInputChange}
                    type="email"
                    required
                  />
                </div>
                <div className="flex justify-center gap-3 mx-2 pt-2 w-49/50">
                  <FormInput
                    label="Symptoms"
                    name="symptoms"
                    value={form.symptoms}
                    onChange={handleInputChange}
                    type="textarea"
                    className="w-full border border-gray-200 rounded-lg focus:outline-0"
                    divClassName=" w-1/2 h-24 "
                  />
                  <FormInput
                    label="Reason for Visit"
                    name="reason"
                    value={form.reason}
                    onChange={handleInputChange}
                    type="textarea"
                    className="w-full border border-gray-200 rounded-lg  focus:outline-0"
                    divClassName=" w-1/2 h-24"
                  />
                </div>
                <div className="flex justify-start gap-3 mx-2 pt-2 w-49/50">
                  <FormInput
                    label="Attachment:"
                    name="attachment"
                    onChange={handleInputChange}
                    type="file"
                    className="border-0"
                    divClassName="flex justify-start items-center gap-2 w-full"
                  />
                </div>

                </form>
             </div>
           </div>
           <div className=" h-1/10 flex justify-between items-center px-5">
             <button onClick={() => navigate(-1)} className="btn btn-error">{"< "} Back</button>
             <button onClick={() => navigate("/payment")} className="btn btn-primary">Select Payment {" >"}</button>
           </div>
         </div>
       </div>
  )
}
export default PatientInfoPage