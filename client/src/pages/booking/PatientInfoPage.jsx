import { useNavigate } from "react-router";
import useBookingStore from "../../stores/bookingStore.js";
import { PinIcon, StarIcon } from "../../components/icons/index.jsx";
import { useEffect } from "react";
import {BookingFormInput} from "../../components/FormInput.jsx";
import authStore from "../../stores/authStore.js";
import usePatientFormStore from "../../stores/usePatientFormStore.js";
import axios from "axios";
import BookingNavButtons from "../../components/booking/BookingNavButtons.jsx";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal.jsx";

function PatientInfoPage() {

  const user = authStore((state) => state.user)
  const doctor = useBookingStore((state) => state.doctorDetails);
  const navigate = useNavigate();

  const { patientForm, setField } = usePatientFormStore();

  // Initialize patientForm fields from user profile if patientForm is empty
  useEffect(() => {
    // Check if all patientForm values are empty
    const allEmpty = Object.values(patientForm).every(v => !v);
    if (user?.Patient && allEmpty) {
      setField("address", user.Patient.address || "");
      setField("height", user.Patient.PatientMedicalProfile?.height || "");
      setField("weight", user.Patient.PatientMedicalProfile?.weight || "");
      setField("bloodtype", user.Patient.PatientMedicalProfile?.bloodType || "");
      setField("birthDate", user.Patient.birthDate || "");
      setField("gender", user.Patient.gender || "");
      setField("nationalId", user.Patient.nationalId || "");
      setField("congenital", user.Patient.PatientMedicalProfile?.congenital || "");
      setField("allergies", user.Patient.PatientMedicalProfile?.allergies || "");
      setField("surgeries", user.Patient.PatientMedicalProfile?.surgeries || "");
      setField("medications", user.Patient.PatientMedicalProfile?.medications || "");
      setField("emergencyContactName", user.Patient.emergencyContactName || "");
      setField("emergencyContactPhone", user.Patient.emergencyContactPhone || "");
      setField("emergencyContactRelation", user.Patient.emergencyContactRelation || "");
      setField("symptoms", user.Patient.symptoms || "");
    }
  }, [user, patientForm, setField]);

const [openConfirmModal, setOpenConfirmModal] = useState(false);

const handleSubmitWithConfirm = () => {
  setOpenConfirmModal(true);
};
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
      address: patientForm.address,
      birthDate: patientForm.birthDate,
      gender: patientForm.gender,
      nationalId: patientForm.nationalId,
      emergencyContactName: patientForm.emergencyContactName,
      emergencyContactPhone: patientForm.emergencyContactPhone,
      emergencyContactRelation: patientForm.emergencyContactRelation, 
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

    toast.success("โปรไฟล์ผู้ป่วยถูกบันทึกเรียบร้อยแล้ว");
    console.log("Profile saved", response.data);
    navigate("/payment");
  } catch (error) {
    console.error("Error submitting profile:", error);
  }
};

//  const handleNext = () => {
//     if (!selectedDate || !selectedSlot) return alert("Select date and time");

//     const startDateTime = new Date(
//       `${selectedDate}T${selectedSlot.startTime}:00`
//     );
//     const endDateTime = new Date(`${selectedDate}T${selectedSlot.endTime}:00`);

//     // Set to global state
//     setStartDateTime(startDateTime.toISOString());
//     setEndDateTime(endDateTime.toISOString());

//     navigate("/payment");
//   };

  const handlePrevious = () => {
    navigate('/bookingdatetime');
  };

  const { specialty, appointmentType, hospital, service, selectedDate, selectedTime } = useBookingStore();
 const dateObj = selectedDate ? new Date(selectedDate) : null;
  return (

   <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-full font-prompt">
         <div className="h-1/7 w-full flex items-center justify-center">
           <ul className="steps h-full">
             <li data-content="✓" className="step step-primary step-success">
            รูปแบบการนัดหมาย
          </li>
          <li data-content="✓" className="step step-primary step-success">
            เลือกเฉพาะทาง
          </li>
          <li data-content="✓" className="step step-primary step-success">
           วันเวลา นัดหมาย
          </li> 
          <li data-content="4" className="step step-primary">
            ข้อมูลส่วนตัว
          </li>
          <li data-content="5" className="step">
           ชำระเงิน
          </li>
          <li data-content="6" className="step">
            ยืนยันสำเร็จ
          </li>
           </ul>
         </div>
         <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
           <div className="h-fit mt-4 flex flex-col items-center justify-center">
             <div className="py-3 bg-white border border-gray-200 h-2/3 min-h-[120px] w-19/20 flex flex-col rounded-2xl">
               <div className="flex w-full">
                 <div className="w-1/5 avatar flex items-center justify-center">
                   <div className="w-25 rounded-full">
                     <img
                       src={doctor.Account.profilePictureUrl || "https://via.placeholder.com/150"}
                       alt="doctor"
                     />
                   </div>
                 </div>
                 <div className="w-4/5 p-1 flex flex-col justify-between items-start">
                   <div className="flex items-start gap-2">
                     <div className="flex flex-col items-start ">
                       <div className="font-bold text-2xl">{'Dr. ' + doctor.firstName + " " + doctor.lastName || 'Dr.John Nontakaeng'}</div>
                       <div className="text-blue-700 ">{doctor?.specialties?.[0]?.Specialty?.name}</div>
                     </div>
                     <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
                       <StarIcon className="h-4" />
                       <div className="text-white text-sm">5.0</div>
                     </div>
                   </div>
                   <div className="flex items-center justify-start">
                     <PinIcon className="h-5" />
                     <div className="text-gray-500">{doctor.address || '742 Evergreen Terrace, Springfield'}</div>
                   </div>
                 </div>
               </div>
               {/* Main Booking Info Section - Specialty, Service, Date & Time, Appointment Type */}
               <div className="mt-2 w-full border-gray-200 pt-2 px-4">
                 <div className="flex flex-row justify-between gap-4 text-sm">
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">สาขา เฉพาะทาง</span>
                     <span className="font-semibold text-gray-700">{specialty || <span className="text-gray-400">ไม่ได้เลือก</span>}</span>
                   </div>
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">บริการ</span>
                     <span className="font-semibold text-gray-700">{service || <span className="text-gray-400">ไม่ได้เลือก</span>}</span>
                   </div>
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">วันที่ เวลา</span>
                     <span className="font-semibold text-gray-700">
                       {dateObj && selectedTime
                         ? <span className="text-gray-600">{`${dateObj.toLocaleDateString()} ${selectedTime}`}</span>
                         : <span className="text-gray-400">ไม่ได้เลือก</span>}
                     </span>
                   </div>
                   <div className="flex flex-col items-start justify-center w-1/4">
                     <span className="font-medium  mb-1">ประเภท การนัดหมาย</span>
                     <span className="font-semibold text-gray-700">
                       {appointmentType
                         ? appointmentType === 'Hospital'
                           ? `Hospital${hospital ? ` (${hospital})` : ''}`
                           : appointmentType
                         : <span className="text-gray-400">ไม่ได้เลือก</span>}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="h-[600px] flex flex-col  items-center pt-4 gap-3">
             <div className="flex flex-col p-3 bg-white border border-gray-200 h-full w-19/20 rounded-2xl">
             <h2 className="font-bold text-xl mx-3 my-2">กรุณากรอกข้อมูลส่วนตัว ก่อนทำการนัดหมาย</h2>
                <form className="w-full flex flex-col gap-5" encType="multipart/form-data">

                <div className="flex justify-between gap-2 items-start pt-2 mx-2">

                  <div className="flex justify-between  gap-6 items-start pt-2 mx-1">
                    <div className="w-auto">
                      <div className="font-medium">ชื่อจริง</div>
                      <div className="font-light text-slate-500">{user?.Patient?.firstName || "Loading..."}</div>
                    </div>
                    <div className="w-auto">
                      <div className="font-medium">นามสกุล</div>
                      <div className="font-light text-slate-500">{user?.Patient?.lastName || "Loading..."}</div>
                    </div>
                    <div className="w-auto">
                      <div className="font-medium">เบอร์มือถือ</div>
                      <div className="font-light text-slate-500">{user?.phone || "Loading..."}</div>
                    </div>
                    <div className="w-auto">
                      <div className="font-medium">อีเมล</div>
                      <div className="font-light text-slate-500">{user?.email || "Loading..."}</div>
                    </div>
                  </div>

                    <BookingFormInput
                      label="ที่อยู่"
                      name="address"
                      value={patientForm.address || ""}
                      onChange={(e) => setField("address", e.target.value)}
                      required
                      className="w-70"
                    />
                      <BookingFormInput
                    label="เลขบัตรประชาชน"
                    name="nationalId"
                      value={patientForm.nationalId || ""}
                    onChange={(e) => setField("nationalId", e.target.value)}
                    required
                    className="w-full"
                  />
                   
                </div>
                 <div className="flex justify-between gap-2 items-start pt-2 mx-2">
                   <BookingFormInput
                      label="ส่วนสูง"
                      name="height"
                      value={patientForm.height || ""}
                      onChange={(e) => setField("height", e.target.value)}
                      required
                      className="w-full"
                    />
                  <BookingFormInput
                    label="น้ำหนัก"
                    name="weight"
                      value={patientForm.weight || ""}
                    onChange={(e) => setField("weight", e.target.value)}
                    className="w-full"
                    required
                  />
                  <BookingFormInput
                    label="กรุ๊ปเลือด"
                    name="bloodtype"
                      value={patientForm.bloodtype || ""}
                    onChange={(e) => setField("bloodtype", e.target.value)}
                    required
                    className="w-full"
                  />
                  <BookingFormInput
                    label="วัดเกิด"
                    name="birthDate"
                      value={patientForm.birthDate || ""}
                    onChange={(e) => setField("birthDate", e.target.value)}
                    required
                    className="w-full"
                  />
                  <BookingFormInput
                    label="เพศ"
                    name="gender"
                      value={patientForm.gender || ""}
                    onChange={(e) => setField("gender", e.target.value)}
                    required
                    className="w-full"
                  />
                
                 </div>
                <div className="flex justify-between gap-2 items-start pt-2 mx-2">
                  <BookingFormInput
                    label="โรคประจำตัว"
                    name="congenital"
                      value={patientForm.congenital || ""}
                    onChange={(e) => setField("congenital", e.target.value)}
                    required
                    className="w-80"
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
 <div className="flex flex-col justify-between gap-2 items-start pt-2 mx-2">
  <h2 className="text-xl font-semibold ">ข้อมูลติดต่อฉุกเฉิน</h2>
  <div className="flex justify-between gap-2 items-start pt-2">
                    <BookingFormInput
                    label="ชื่อผู้ติดต่อฉุกเฉิน"
                    name="emergencyContactName"
                      value={patientForm.emergencyContactName || ""}
                    onChange={(e) => setField("emergencyContactName", e.target.value)}
                    required
                  />
                    <BookingFormInput
                    label="เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน"
                    name="emergencyContactPhone"
                      value={patientForm.emergencyContactPhone || ""}
                    onChange={(e) => setField("emergencyContactPhone", e.target.value)}
                    required
                  />
                    <BookingFormInput
                    label="ความสัมพันธ์กับผู้ติดต่อฉุกเฉิน"
                    name="emergencyContactRelation"
                      value={patientForm.emergencyContactRelation || ""}
                    onChange={(e) => setField("emergencyContactRelation", e.target.value)}
                    required
                  />
 </div>
 </div>
                <div className="flex justify-start gap-3 mx-2 pt-2 w-49/50">
                  <BookingFormInput
                    label="อาการที่เป็นอยู่"
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
           <div className="flex px-8 justify-between items-center">
          <BookingNavButtons
        onBack={handlePrevious}
        onNext={handleSubmitWithConfirm}
        title='เลือกชำระเงิน'
      />
           </div>
           <ConfirmModal
  open={openConfirmModal}
  onCancel={() => setOpenConfirmModal(false)}
  onConfirm={() => {
    setOpenConfirmModal(false);
    handleSubmit();
  }}
  title="ยืนยันการดำเนินการ"
  description="คุณต้องการดำเนินการต่อไปยังขั้นตอนชำระเงินหรือไม่?"
/>
         </div>
       </div>
  )
}
export default PatientInfoPage
