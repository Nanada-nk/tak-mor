import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Brandner from "../../../components/Brandner.jsx";
import VideoCallTwilio from "../../../components/callandvideo/VideoCallTwilio.jsx";
import teleApi from '../../../api/teleApi.js';
import adminTeleApi from '../../../api/adminTeleApi.js';
import teleStore, { CALL_STATUS } from '../../../stores/teleStore.js';
import authStore from '../../../stores/authStore.js';


function VideoCallPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currentUser = authStore((state) => state.user)

  // ดึง state และ action ที่จำเป็นจาก teleStore
  const callStatus = teleStore((state) => state.callStatus);
  const setCallStatus = teleStore((state) => state.setCallStatus);
  const setError = teleStore((state) => state.setError);
  const teleError = teleStore((state) => state.error);
  

  const [appointmentData, setAppointmentData] = useState(null);
  const [twilioToken, setTwilioToken] = useState(null);

  // useEffect สำหรับการโหลดข้อมูลการนัดหมายและ Twilio Token
  useEffect(() => {
    console.log('useEffectVideoCallPage')
    const fetchAllData = async () => {
      if (!roomId || !currentUser) {
        setError("Room ID is missing in URL.");
        setCallStatus(CALL_STATUS.APPOINTMENT_ERROR);
        return;
      }
      console.log('fetchAllData', fetchAllData)

      setCallStatus(CALL_STATUS.LOADING_APPOINTMENT);
      setError(null);

      try {
        // 1. โหลดข้อมูลการนัดหมาย
        const response = await adminTeleApi.getAppointmentByRoomId(roomId);
        const fetchedAppointment = response.data.data;

        if (!fetchedAppointment) {
          setError(`Appointment with Room ID ${roomId} not found.`);
          setCallStatus(CALL_STATUS.APPOINTMENT_ERROR);
          return;
        }
        console.log('fetchedAppointment', fetchedAppointment)
        setAppointmentData(fetchedAppointment);

        // 2. โหลด Twilio Token (เรียก Endpoint ที่เราสร้างเมื่อกี้)
        // const userId = fetchedAppointment.patientId;
        const userId = currentUser.id;
        const token = await teleApi.getTwilioVideoToken(userId, roomId);
        console.log('token', token)

        setTwilioToken(token);
        setCallStatus(CALL_STATUS.IDLE);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message || err.response?.data?.message || 'Failed to load appointment details or Twilio token.');
        setCallStatus(CALL_STATUS.APPOINTMENT_ERROR);
      }
    };

    fetchAllData();

    // Cleanup function
    return () => {
      teleStore.getState().clearTeleState();
    };
  }, [roomId, navigate, setCallStatus, setError, currentUser]);


  if (callStatus === CALL_STATUS.LOADING_APPOINTMENT) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
          <span className="loading loading-infinity loading-xl text-primary"></span>
          <p className="mt-4 text-lg font-semibold text-gray-700">กำลังโหลดข้อมูลการนัดหมาย...</p>
          <p className="text-sm text-gray-500">โปรดรอสักครู่</p>
        </div>
      </div>
    );
  }

  if (callStatus === CALL_STATUS.APPOINTMENT_ERROR) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
        <div className="text-center p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Error Loading Appointment</h2>
          <p className="text-lg">{teleError}</p>
          <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-prompt">
      <div>
        <Brandner title="การโทรด้วยวีดีโอ" />
      </div>
      <div className="px-10 py-5">
        {/* 3. Render VideoCall component เมื่อ appointmentData และ twilioToken พร้อมใช้งาน */}
        {appointmentData && twilioToken ? (
          <VideoCallTwilio roomId={roomId} appointmentData={appointmentData} twilioToken={twilioToken} />
        ) : (
          <div className="text-center text-gray-400">Waiting for data...</div>
        )}
      </div>
    </div>
  );
}

export default VideoCallPage;

