import { useNavigate } from "react-router";
import useBookingStore from "../../stores/bookingStore.js";
import { PinIcon, StarIcon } from "../../components/icons/index.jsx";
import { useState, useEffect } from "react";
import {BookingFormInput} from "../../components/FormInput.jsx";
import authStore from "../../stores/authStore.js";
import usePatientFormStore from "../../stores/usePatientFormStore.js";
import axios from "axios";

function PatientInfoPage() {
  const user = authStore((state) => state.user)
  const navigate = useNavigate();

const { patientForm, setField } = usePatientFormStore();


// const handleSubmit = async () => {
//   try {
//     const user = authStore.getState().user;
//     const { patientForm } = usePatientFormStore.getState();
//     const patientId = user?.Patient?.id;
//     if (!patientId) {
//       console.error("Missing patient ID");
//       return;
//     }

// const tokenResponse = await axios.get("http://localhost:9090/csrf-token", {
//       withCredentials: true,
//     });
//     const csrfToken = tokenResponse.data.csrfToken;


    
//     const response = await axios.post(
//       `http://localhost:9090/api/patient/${patientId}/profile`,
//       {
//         ...patientForm,
//         patientId: user?.Patient?.id,
//       },
//       {
//         headers: {
//           "CSRF-Token": csrfToken, // ✅ correct header for csurf
//         },
//         withCredentials: true, // ✅ important if using cookies
//       }
//     );
//     alert("Profile saved successfully");
//     console.log("Profile saved", response.data);
//     navigate("/payment");
//   } catch (error) {
//     console.error("Error submitting profile:", error);
//   }
// };

const handleSubmit = async () => {
  try {
    const user = authStore.getState().user;
    const { patientForm } = usePatientFormStore.getState();
    const patientId = Number(user?.Patient?.id);
    if (!patientId) {
      console.error("Missing patient ID");
      return;
    }

    // Get CSRF token
    const tokenResponse = await axios.get("http://localhost:9090/csrf-token", {
      withCredentials: true,
    });
    const csrfToken = tokenResponse.data.csrfToken;

    // 1. Check if profile exists
    let profileExists = false;
    try {
      await axios.get(`http://localhost:9090/api/patient/${patientId}/profile`, {
        headers: { "CSRF-Token": csrfToken },
        withCredentials: true,
      });
      profileExists = true;
    } catch (err) {
      if (err.response?.status === 404) {
        profileExists = false;
      } else {
        throw err; // Other errors
      }
    }

    // 2. Prepare data (map field names if needed)
    const data = {
      height: patientForm.height,
      weight: patientForm.weight,
      bloodType: patientForm.bloodtype,
      congenital: patientForm.congenital,
      allergies: patientForm.allergies,
      surgeries: patientForm.surgeries,
      medications: patientForm.medications,
    };

    // 3. Create or update
    let response;
    if (profileExists) {
      response = await axios.put(
        `http://localhost:9090/api/patient/${patientId}/profile`,
        data,
        {
          headers: { "CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
    } else {
      response = await axios.post(
        `http://localhost:9090/api/patient/${patientId}/profile`,
        data,
        {
          headers: { "CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
    }

    alert("Profile saved successfully");
    console.log("Profile saved", response.data);
    navigate("/payment");
  } catch (error) {
    console.error("Error submitting profile:", error);
  }
};


  const { specialty, appointmentType, hospital, service, dateTime } = useBookingStore();
  const selectedDate = dateTime?.date || null;
  const selectedTime = dateTime?.time || null;
  return (
<<<<<<< HEAD
   <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)] font-prompt">
=======
   <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-full font-prompt">
>>>>>>> 4fd5c2ff6c62651d2d12ff122f9a5889ccd7664b
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
                         ? appointmentType === 'Hospital'
                           ? `Hospital${hospital ? ` (${hospital})` : ''}`
                           : appointmentType
                         : <span className="text-gray-400">Not selected</span>}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="h-[360px] flex flex-col items-center pt-4 gap-3">
             <div className="flex flex-row p-3 bg-white border border-gray-200 h-full w-19/20 rounded-2xl">
                <form className="w-full flex flex-col gap-5" encType="multipart/form-data">
                <div className="flex justify-between gap-2 items-start pt-2 mx-2">
                  <div className="flex justify-between gap-10 items-start pt-2 mx-1">
  <div className="w-auto">
    <div className="font-medium">First Name</div>
    <div>{user.Patient?.firstName || "Loading..."}</div>
  </div>
  <div className="w-auto">
    <div className="font-medium">Last Name</div>
    <div>{user.Patient?.lastName || "Loading..."}</div>
  </div>
  <div className="w-auto">
    <div className="font-medium">Phone Number</div>
    <div>{user.phone || "Loading..."}</div>
  </div>
  <div className="w-auto">
    <div className="font-medium">Email Address</div>
    <div>{user.email || "Loading..."}</div>
  </div>
</div>

                    <BookingFormInput
                      label="ส่วนสูง"
                      name="height"
                      value={patientForm.height || ""}
                      onChange={(e) => setField("height", e.target.value)}
                      required
                    />
                  <BookingFormInput
                    label="น้ำหนัก"
                    name="weight"
                      value={patientForm.weight || ""}
                    onChange={(e) => setField("weight", e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between gap-2 items-start pt-2 mx-2">
                  <BookingFormInput
                    label="กรุ๊ปเลือด"
                    name="bloodtype"
                      value={patientForm.bloodtype || ""}
                    onChange={(e) => setField("bloodtype", e.target.value)}
                    required
                  />
                    <BookingFormInput
                      label="โรคประจำตัว"
                      name="congenital"
                        value={patientForm.congenital || ""}
                      onChange={(e) => setField("congenital", e.target.value)}
                      required
                    />
                  <BookingFormInput
                    label="ภูมิแพ้"
                    name="allergies"
                      value={patientForm.allergies || ""}
                    onChange={(e) => setField("allergies", e.target.value)}
                    required
                  />
                  <BookingFormInput
                    label="ประวัติการผ่าตัด/ศัลยกรรม"
                    name="surgeries"
                      value={patientForm.surgeries || ""}
                    onChange={(e) => setField("surgeries", e.target.value)}
                    required
                  />
               
                  <BookingFormInput
                    label="ประวัติการใช้ยา"
                    name="medications"
                      value={patientForm.medications || ""}
                    onChange={(e) => setField("medications", e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-center gap-3 mx-2 pt-2 w-49/50">
                  <BookingFormInput
                    label="Symptoms"
                    name="symptoms"
                    value={patientForm.symptoms}
                    onChange={(e) => setField("symptoms", e.target.value)}
                    type="textarea"
                    className="w-full h-20 border border-gray-200 rounded-lg focus:outline-0"
                    divClassName=" w-1/2 h-24 "
                  />
               
                </div>
                {/* <div className="flex justify-start gap-3 mx-2 pt-2 w-49/50">
                  <BookingFormInput
                    label="Attachment:"
                    name="attachment"
                    onChange={handleInputChange}
                    type="file"
                    className="border-0"
                    divClassName="flex justify-start items-center gap-2 w-full"
                  />
                </div> */}

                </form>
             </div>
           </div>
           <div className=" h-1/10 m-6 flex justify-between items-center px-5">
             <button onClick={() => navigate("/bookingdatetime")} className="btn btn-error">{"< "} Back</button>
             <button onClick={handleSubmit} className="btn btn-primary">Select Payment {" >"}</button>
           </div>
         </div>
       </div>
  )
}
export default PatientInfoPage
