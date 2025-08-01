
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, MessageCircle, Phone, Mail, FileText, Send } from 'lucide-react';
import { PinIcon, StarIcon } from '../../components/icons/index.jsx';
import useBookingStore from '../../stores/bookingStore.js';
import usePatientFormStore from '../../stores/usePatientFormStore.js';
import axios from 'axios';

function BookingComfirmationPage() {
  const handleResend = () => {
    setCooldown(10); // 10 second cooldown
  };
  const navigate = useNavigate();
  const {
    specialty,
    service,
    hospital,
    dateTime,
    servicePrice
  } = useBookingStore();

 const doctorId = useBookingStore(state => state.doctorId);

  const [doctor, setDoctor] = useState(null);
console.log(doctorId)
useEffect(() => {
   console.log("doctorId:", doctorId);
  if (!doctorId) return;
  console.log("Fetching doctor with ID:", doctorId);
  axios.get(`http://localhost:9090/api/doctor/${doctorId}`)
    .then(res => {
      console.log("Doctor response:", res.data);
      setDoctor(res.data);
    })
    .catch(err => console.error("Failed to fetch doctor:", err));
}, [doctorId]);


  const [showEmailPopup] = useState(true); // Always true, popup stays
  const [cooldown, setCooldown] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Cooldown timer logic
  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);


  // fallback mock data for demo if store is empty
  const fallback = {
    doctor: 'Dr. John Nontakaeng',
    specialty: 'Psychologist',
    date: '2025-07-30',
    time: '14:00',
    location: '742 Evergreen Terrace, Springfield',
    bookingId: 'BK-20250725-001',
    patient: 'Jane Smith',
    paymentMethod: 'Credit Card',
    service: 'Consultation',
    servicePrice: 500,
    bookingFee: 50,
    tax: 35,
    discount: 20,
    total: 565,
  };

  // Compose booking info from store or fallback
  const bookingInfo = {
    doctor: doctor.firstName, // Not in store, static for now
    specialty: specialty || fallback.specialty,
    date: dateTime?.date ? dateTime.date.toLocaleDateString() : fallback.date,
    time: dateTime?.time || fallback.time,
    location: hospital || fallback.location,
    bookingId: fallback.bookingId, // Not in store, static for now
    patient: 'Jane Smith', // Not in store, static for now
    paymentMethod: 'Credit Card', // Not in store, static for now
    service: service || fallback.service,
    servicePrice: servicePrice > 0 ? servicePrice : fallback.servicePrice,
    bookingFee: fallback.bookingFee,
    tax: fallback.tax,
    discount: fallback.discount,
    total: (servicePrice > 0 ? servicePrice : fallback.servicePrice) + fallback.bookingFee + fallback.tax - fallback.discount,
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 m-auto w-2/3 h-[calc(100vh-10rem)] font-prompt">
      {/* ...existing code... */}
      <div className="h-1/7 w-full flex items-center justify-center">
        <ul className="steps h-full">
          <li data-content="✓" className="step step-primary step-success">Specialty</li>
          <li data-content="✓" className="step step-primary step-success">Appointment Type</li>
          <li data-content="✓" className="step step-primary step-success">Date & Time</li>
          <li data-content="✓" className="step step-primary step-success">Patient Information</li>
          <li data-content="✓" className="step step-primary step-success">Payment</li>
          <li data-content="✓" className="step step-primary step-success">Confirmation</li>
        </ul>
      </div>
      <div className="h-6/7 w-full bg-gray-100 rounded-2xl">
        {/* Doctor info section removed as requested */}
        <div className="h-[502px] flex items-center justify-between pt-4 gap-3 w-19/20 m-auto">
          <div className="flex p-3 bg-white border border-gray-200 h-full w-full rounded-2xl gap-6">
            {/* Left side: Booking Confirmed! on top, Payment Info below */}
            <div className='flex flex-col items-center justify-start flex-1 gap-4'>
              {/* Booking Confirmed! */}
              <div className='flex flex-col items-center border rounded-2xl px-6 py-4 min-w-[220px] bg-green-50 border-green-200 w-full relative'>
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
                <div className='text-xl font-bold text-green-700 mb-1'>Booking Confirmed!</div>
                <div className='text-gray-600 text-center text-sm mb-1'>Your appointment has been successfully booked.</div>
                <div className='flex items-center justify-center mt-2'>
                  <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-800 text-sm font-semibold shadow-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 012 2v6a2 2 0 01-2 2z" /></svg>
                    Booking ID: <span className='ml-1'>{bookingInfo.bookingId}</span>
                  </span>
                </div>
                {showEmailPopup && (
                  <div
                    className="absolute top-2 right-2 bg-white border border-green-400 shadow rounded-lg px-3 py-1 flex items-center gap-2 text-xs z-10 group"
                   
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <Send className="w-4 h-5 text-green-700" />
                    {((hovered && cooldown === 0) || cooldown > 0) ? (
                      <button
                        className={`ml-2 px-2 py-0.5 rounded border border-green-400 text-green-700 font-medium bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={handleResend}
                        disabled={cooldown > 0}
                        style={{ fontSize: '0.85em', cursor: cooldown > 0 ? 'not-allowed' : 'pointer' }}
                      >
                        {cooldown > 0 ? `Resend (${cooldown})` : 'Resend'}
                      </button>
                    ) : (
                      <span className="text-green-800 font-semibold">Email sent!</span>
                    )}
                  </div>
                )}
              </div>
            {/* Payment Info */}
              <div className='flex flex-col items-start border rounded-2xl px-6 py-4 min-w-[220px] bg-gray-50 border-gray-200 w-full'>
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-bold">Payment Info</span>
                  <button
                    className="btn btn-outline btn-sm ml-2 flex items-center justify-center"
                    onClick={() => window.print()}
                    title="Print to PDF"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
                <div className="w-full flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-y-2 text-base">
                    <div className="text-gray-600">{bookingInfo.service}</div>
                    <div className="text-right text-gray-800 font-semibold">฿{bookingInfo.servicePrice}</div>
                    <div className="text-gray-600">Booking Fees</div>
                    <div className="text-right text-gray-800 font-semibold">฿{bookingInfo.bookingFee}</div>
                    <div className="text-gray-600">Tax</div>
                    <div className="text-right text-gray-800 font-semibold">฿{bookingInfo.tax}</div>
                    <div className="text-gray-600">Discount</div>
                    <div className="text-right text-green-600 font-semibold">-฿{bookingInfo.discount}</div>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 mt-3 pt-2 text-lg font-bold">
                    <div>Total</div>
                    <div className="text-blue-600">฿{bookingInfo.total}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side: Booking Info and Assistance Section as sibling blocks */}
            <div className='flex flex-col flex-1'>
              {/* Doctor Detail Card */}
              <div className='flex items-center gap-4 border rounded-2xl px-6 py-4 bg-white border-blue-200 mb-4 w-full'>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Doctor profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                />
                <div className="flex flex-col">
                  <div className="font-bold text-lg text-blue-800">{bookingInfo.doctor}</div>
                  <div className="text-blue-600 text-sm font-medium">{bookingInfo.specialty}</div>
                  <div className="text-gray-600 text-sm">{bookingInfo.location}</div>
                </div>
              </div>
              <div className='flex flex-col items-start justify-center border rounded-2xl px-6 py-4 min-w-[220px] bg-gray-50 border-gray-200 w-full'>
                <div className="font-bold mb-2">Booking Info</div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full">
                  <div>
                    <div className="font-medium text-gray-600">Booking ID</div>
                    <div className="font-semibold text-gray-800 text-base">{bookingInfo.bookingId}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Patient</div>
                    <div className="font-semibold text-gray-800 text-base">{bookingInfo.patient}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Date & Time</div>
                    <div className="font-semibold text-gray-800 text-base">{bookingInfo.date} {bookingInfo.time}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Payment Method</div>
                    <div className="font-semibold text-gray-800 text-base">{bookingInfo.paymentMethod}</div>
                  </div>
                </div>
              </div>
              {/* Assistance Section as a new block under Booking Info */}
              <div className="w-full mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex flex-col items-start">
                <div className="font-semibold text-blue-700 mb-1">Need our assistance?</div>
                <div className="text-gray-700 text-sm mb-3">If you have any questions or need help with your booking, please contact our support team.</div>
                <div className="flex gap-3 w-full">
                  <button className="btn btn-primary btn-sm flex-[3] min-w-0 h-9 flex items-center gap-1 justify-center" onClick={() => alert('Chat support coming soon!')}>
                    <MessageCircle className="w-4 h-4" /> Live Chat
                  </button>
                  <button className="btn btn-outline btn-sm flex-[3] min-w-0 h-9 flex items-center gap-1 justify-center" onClick={() => alert('Voice chat support coming soon!')}>
                    <Phone className="w-4 h-4" /> Voice Chat
                  </button>
                  <a
                    href="mailto:support@takmor.com"
                    className="btn btn-ghost btn-xs flex-[1] min-w-0 h-9 px-2 py-1 text-xs text-blue-700 border border-blue-200 hover:bg-blue-100 flex items-center justify-center"
                    style={{lineHeight:1.2}}
                    title="Email support"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-1/10 flex justify-between items-center px-5">
          <button onClick={() => navigate("/")} className="btn btn-error">Home</button>
          <button onClick={() => navigate("/dashboard")} className="btn btn-primary">Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default BookingComfirmationPage;