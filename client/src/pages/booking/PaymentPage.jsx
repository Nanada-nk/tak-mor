import React, { useState, useEffect } from 'react';
import { CreditCard, QrCode } from 'lucide-react';
import { useNavigate } from "react-router";
import { PinIcon, StarIcon } from "../../components/icons/index.jsx"; 
import useBookingStore from "../../stores/bookingStore.js";
import { BookingFormInput } from "../../components/FormInput.jsx";
import axios from "axios";
import usePatientFormStore from "../../stores/usePatientFormStore.js";
import authStore from "../../stores/authStore.js";




function PaymentPage() {


useEffect(() => {
  window.Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);
}, []);

const doctor = useBookingStore((state) => state.doctorDetails);

  // Animation state for redirect
  const [fadeOut, setFadeOut] = useState(false);
  // Payment processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // Inline payment confirmation state
  const [confirmState, setConfirmState] = useState(false);
  const navigate = useNavigate();
  const { specialty, appointmentType, hospital, service, } = useBookingStore();


  // Fallback mock data for doctor, specialty, location
  const fallback = {
    doctor: 'Dr.John Nontakaeng',
    specialty: 'Psychologist',
    location: '742 Evergreen Terrace, Springfield',
  };

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'qr'

  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardTouched, setCardTouched] = useState(false);
  const isCardValid = cardNumber && cardName && cardExpiry && cardCVV;

  
  
  // Dynamic doctor, specialty, location
  const doctorName = doctor.firstName + " " + doctor.lastName || fallback.doctor; // Not in store, static for now
  const doctorSpecialty = specialty || fallback.specialty;
  const doctorLocation = hospital || fallback.location;
  
  const { doctorId, selectedDate, selectedTime, servicePrice } = useBookingStore();
  const user = authStore((state) => state.user);
  const { patientForm } = usePatientFormStore();
  
  // Mock values for demonstration
  const bookingFee = 50;
  const tax = 35;
  const discount = 20;
  const total = servicePrice + bookingFee + tax - discount;

const handleCreateAppointment = async () => {
  try {
    // Compose start and end time (assume 30 min slot)
    const startTime = selectedTime; // e.g. "09:00"
    // Calculate endTime (add 30 min)
    const [h, m] = startTime.split(":").map(Number);
    const end = new Date(selectedDate);
    end.setHours(h);
    end.setMinutes(m + 30);
    const endTime = `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;

  const tokenResponse = await axios.get("http://localhost:9090/csrf-token", {
                      withCredentials: true,
                    });
                    const csrfToken = tokenResponse.data.csrfToken;


    const response = await axios.post("http://localhost:9090/api/appointment", {
      patientId: user.Patient.id,
      doctorId,
      date: selectedDate, // should be ISO string or Date
      startTime,
      endTime,
      symptoms: patientForm.symptoms,
      price: servicePrice,
      status: "CONFIRMED", // or "PENDING" if you want to confirm later
    },{
          headers: { "CSRF-Token": csrfToken },
          withCredentials: true,
        });

    return response.data;
  } catch (err) {
    console.error("Failed to create appointment:", err);
    throw err;
  }
};

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
          <li data-content="✓" className="step step-primary step-success">
            ข้อมูลส่วนตัว
          </li>
          <li data-content="5" className="step step-primary">
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
                       <div className="font-bold text-2xl">{'Dr. ' + doctorName}</div>
                       <div className="text-blue-700 ">{doctorSpecialty}</div>
                     </div>
                     <div className="flex bg-orange-400 p-[5px] rounded-lg justify-center items-center gap-1">
                       <StarIcon className="h-4" />
                       <div className="text-white text-sm">5.0</div>
                     </div>
                   </div>
                   <div className="flex items-center justify-start">
                     <PinIcon className="h-5" />
                     <div className="text-gray-500">{doctorLocation}</div>
                   </div>
                 </div>
               </div>
             
                
             </div>
           </div>
           <div className="h-[360px] flex items-center justify-between pt-4 gap-3 w-19/20 m-auto">
             <div className="flex flex-col p-3 bg-white border border-gray-200 h-full w-1/2 rounded-2xl">
               <p className="font-bold">ช่องทางการชำระเงิน</p>
               <div className="flex flex-col flex-1 mt-4">
                 {paymentSuccess ? (
                   <div className="flex flex-col items-center justify-center h-full gap-3">
                     <span className="flex items-center gap-2 text-green-700 text-lg font-semibold">
                       <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                       Payment Successful
                     </span>
                     <span className="text-gray-600 text-base">Thank you for your payment!</span>
                   </div>
                 ) : isProcessing ? (
                   <div className="flex flex-col items-center justify-center h-full gap-3">
                     <span className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
                       <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                       Processing Payment...
                     </span>
                   </div>
                 ) : confirmState ? (
                   <div className="flex flex-col items-center justify-center h-full gap-3">
                     <div className="text-xl font-bold text-blue-700">ยืนยันการชำระเงิน</div>
                     <div className="text-gray-700 mb-2 text-center">คุณต้องการชำระเงินทันทีหรือไม่?</div>
                     <div className="flex gap-3 w-full max-w-xs justify-center">
                       <button
                         className="btn btn-outline flex-1"
                         onClick={() => setConfirmState(false)}
                         disabled={isProcessing || paymentSuccess}
                       >
                         ยกเลิก
                       </button>
                       <button
                         className="btn btn-primary flex-1"
                         disabled={isProcessing || paymentSuccess}
                         onClick={async () => {
  setIsProcessing(true);
  
  try {
    if (paymentMethod === 'card') {
      const [expMonth, expYear] = cardExpiry.split('/');
      await new Promise((resolve, reject) => {
        window.Omise.createToken('card', {
          name: cardName,
          number: cardNumber,
          expiration_month: parseInt(expMonth),
          expiration_year: parseInt('20' + expYear),
          security_code: cardCVV
        }, async (statusCode, response) => {
          
          if (response.object === "token") {
            const token = response.id;
            try {
              const tokenResponse = await axios.get("http://localhost:9090/csrf-token", {
                      withCredentials: true,
                    });
                    const csrfToken = tokenResponse.data.csrfToken;
              await axios.post("http://localhost:9090/api/payment/credit", {
                token,
                amount: Math.round(Number(total) * 100),
                method: 'CARD',
                patientId: user.Patient.id
              }, {
          headers: { "CSRF-Token": csrfToken },
          withCredentials: true,
        });
              setPaymentSuccess(true);
              await handleCreateAppointment();
              setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                  navigate("/confirmation");
                  setPaymentSuccess(false);
                  setFadeOut(false);
                }, 600);
              }, 1000);
              resolve();
            } catch (err) {
              console.error("Payment or appointment creation failed:", err);
              alert("Payment failed.");
              reject();
            }
          } else {
            alert(response.message);
            setIsProcessing(false);
            setConfirmState(false);
            reject();
          }
        });
      });
    } else if (paymentMethod === 'qr') {
       const tokenResponse = await axios.get("http://localhost:9090/csrf-token", {
                      withCredentials: true,
                    });
                    const csrfToken = tokenResponse.data.csrfToken;
      const res = await axios.post("http://localhost:9090/api/payment/qr", {
        amount: total * 100,
         patientId: user.Patient.id
      }, {
          headers: { "CSRF-Token": csrfToken },
          withCredentials: true,
        });
      const qrUrl = res.data.authorizeUri;
      window.open(qrUrl, "_blank");

         navigate('/qr-callback');

      // Simulate delay before confirming appointment
      // setPaymentSuccess(true);
      // await handleCreateAppointment();
      // setTimeout(() => {
      //   navigate("/confirmation");
      // }, 1000);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsProcessing(false);
    setConfirmState(false);
  }
}}

                       >
                         ตกลง
                       </button>
                     </div>
                   </div>
                 ) : (
                   <>
                     <div className='paymentMethodSelect flex justify-between items-center mb-4'>
                       <ul className="flex gap-4 w-full justify-center">
                         <li className="w-1/2">
                           <button
                             className={`w-full flex flex-col items-center justify-center rounded-lg border-2 p-3 transition-all duration-200 shadow-sm text-base gap-2 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 font-bold' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                             onClick={() => setPaymentMethod('card')}
                             type="button"
                             disabled={paymentSuccess}
                           >
                             <CreditCard className="w-7 h-7 mb-1 text-blue-600" />
                             Credit/Debit Card
                           </button>
                         </li>
                         <li className="w-1/2">
                           <button
                             className={`w-full flex flex-col items-center justify-center rounded-lg border-2 p-3 transition-all duration-200 shadow-sm text-base gap-2 ${paymentMethod === 'qr' ? 'border-blue-500 bg-blue-50 font-bold' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                             onClick={() => setPaymentMethod('qr')}
                             type="button"
                             disabled={paymentSuccess}
                           >
                             <QrCode className="w-7 h-7 mb-1 text-blue-600" />
                             QR Code
                           </button>
                         </li>
                       </ul>
                     </div>
                     {paymentMethod === 'card' && (
                       <div className='paymentDetails grid grid-cols-2 gap-3'>
                         <BookingFormInput
                           label="Card Number"
                           type="text"
                           placeholder="1234 5678 9012 3456"
                           required
                           value={cardNumber}
                           onChange={e => setCardNumber(e.target.value)}
                           onBlur={() => setCardTouched(true)}
                           error={cardTouched && !cardNumber ? 'Required' : ''}
                           disabled={paymentSuccess}
                         />
                         <BookingFormInput
                           label="Cardholder Name"
                           type="text"
                           placeholder="John Doe"
                           required
                           value={cardName}
                           onChange={e => setCardName(e.target.value)}
                           onBlur={() => setCardTouched(true)}
                           error={cardTouched && !cardName ? 'Required' : ''}
                           disabled={paymentSuccess}
                         />
                         <BookingFormInput
                           label="Expiry Date"
                           type="text"
                           placeholder="MM/YY"
                           required
                           value={cardExpiry}
                           onChange={e => setCardExpiry(e.target.value)}
                           onBlur={() => setCardTouched(true)}
                           error={cardTouched && !cardExpiry ? 'Required' : ''}
                           disabled={paymentSuccess}
                         />
                         <BookingFormInput
                           label="CVV"
                           type="text"
                           placeholder="123"
                           required
                           value={cardCVV}
                           onChange={e => setCardCVV(e.target.value)}
                           onBlur={() => setCardTouched(true)}
                           error={cardTouched && !cardCVV ? 'Required' : ''}
                           disabled={paymentSuccess}
                         />
                       </div>
                     )}
                     {paymentMethod === 'qr' && (
                       <div className='paymentDetails flex flex-col items-center justify-center min-h-[120px]'>
                         <div className="flex flex-col items-center gap-2 w-full">
                           <QrCode className="w-20 h-20 text-gray-400" />
                           <span className="text-gray-600">Scan the QR code to pay</span>
                           {/* Replace with actual QR code image or component as needed */}
                         </div>
                       </div>
                     )}
                     <div className="flex justify-end mt-4">
                       <button
                         onClick={() => {
                           if (paymentMethod === 'card') {
                             setCardTouched(true);
                             if (!isCardValid) return;
                           }
                           setConfirmState(true);
                         }}
                         className="btn btn-primary"
                         disabled={isProcessing || paymentSuccess || (paymentMethod === 'card' && !isCardValid)}
                       >
                         ยืนยันการชำระเงิน {" >"}
                       </button>
                     </div>
                   </>
                 )}
               </div>
             </div>
             <div className={`flex flex-col p-3 bg-white border border-gray-200 h-full w-1/2 rounded-2xl transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
               <div className="flex flex-col flex-1 border-b border-gray-200 mb-3 gap-2">
               <p className="font-bold">ข้อมูลการจอง</p>

                <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
                  <div>
                    <div className="font-medium text-gray-600">ประเภทการนัดหมาย</div>
                    <div className="font-semibold text-gray-800 text-base">
                      {appointmentType
                        ? appointmentType === 'Hospital'
                          ? `Hospital${hospital ? ` (${hospital})` : ''}`
                          : appointmentType
                        : <span className="text-gray-400">Not selected</span>}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">วันที่ เวลา</div>
                    <div className="font-semibold text-gray-800 text-base">
                      {selectedDate && selectedTime
  ? `${(selectedDate instanceof Date ? selectedDate : new Date(selectedDate)).toLocaleDateString()} ${selectedTime}`
  : <span className="text-gray-400">Not selected</span>}
                    </div>
                  </div>
                </div>
               </div>
               <div className="flex flex-col flex-2 ">
                <p className="font-bold mb-2">ข้อมูล การชำระเงิน</p>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-y-2 text-base">
                    <div className="text-gray-600">{service || <span className='text-gray-400'>No service selected</span>}</div>
                    <div className="text-right text-gray-800 font-semibold">{service ? `฿${servicePrice}` : <span className='text-gray-400'>-</span>}</div>
                    <div className="text-gray-600">ค่าจอง</div>
                    <div className="text-right text-gray-800 font-semibold">฿{bookingFee}</div>
                    <div className="text-gray-600">ภาษี</div>
                    <div className="text-right text-gray-800 font-semibold">฿{tax}</div>
                    <div className="text-gray-600">ส่วนลด</div>
                    <div className="text-right text-green-600 font-semibold">-฿{discount}</div>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 mt-3 pt-2 text-lg font-bold">
                    <div>ยอดทั้งหมด</div>
                    <div className="text-blue-600">฿{total}</div>
                  </div>
                </div>
               </div>
             </div>
           </div>
             <div className=" h-1/10 flex justify-between items-center px-8">
               <button onClick={() => navigate("/patientinfo")} className="btn btn-error my-6 text-white" disabled={isProcessing || paymentSuccess}>{"< "} ย้อนกลับ</button>
             </div>
         </div>
       </div>
  );
}

export default PaymentPage;