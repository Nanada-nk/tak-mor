// import { useEffect, useRef, useState, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import teleStore, { CALL_STATUS } from '../../../stores/teleStore.js';
// import authStore from '../../../stores/authStore.js';
// import { io } from 'socket.io-client';
// import SimplePeer from 'simple-peer';
// import Brandner from '../../../components/Brandner.jsx';
// import CallAndVideo from '../../../components/callandvideo/CallAndVideo.jsx'

// function CallingPage() {
//   const { roomId: urlRoomId } = useParams();
//   const navigate = useNavigate();
//   const currentUser = authStore((state) => state.user);

//   // Zustand selectors (สำหรับจัดการ Global State)
//   const callStatus = teleStore((state) => state.callStatus);
//   const participants = teleStore((state) => state.participants);
//   const currentRoomId = teleStore((state) => state.currentRoomId);
//   const isMicMuted = teleStore((state) => state.isMicMuted);
//   const setCallStatus = teleStore((state) => state.setCallStatus);
//   const setParticipants = teleStore((state) => state.setParticipants);
//   const setCurrentRoomId = teleStore((state) => state.setCurrentRoomId);
//   const setMicMuted = teleStore((state) => state.setMicMuted);
//   const setError = teleStore((state) => state.setError);
//   const clearTeleState = teleStore((state) => state.clearTeleState);
//   const teleError = teleStore((state) => state.error); // ดึง error message จาก store

//   // Refs (สำหรับอ้างอิง DOM elements หรือค่าที่เปลี่ยนแปลงแต่ไม่ trigger re-render)
//   const socketRef = useRef(null);
//   const localAudioRef = useRef(null); // Ref สำหรับ <audio> ของเสียงตัวเอง
//   const remoteAudioRef = useRef(null); // Ref สำหรับ <audio> ของเสียงอีกฝ่าย
//   const peerRef = useRef(null); // Ref สำหรับ WebRTC Peer Connection
//   const localStreamRef = useRef(null); // Ref สำหรับ Local Media Stream (ไมโครโฟน)

//   // =============== Call Timer ===============
//   const [callTime, setCallTime] = useState('00:00'); // State สำหรับแสดงผลเวลาโทร (string)
//   const [secondsElapsed, setSecondsElapsed] = useState(0); // State สำหรับนับจำนวนวินาทีที่ผ่านไป
//   const timerRef = useRef(null); // Ref สำหรับเก็บ ID ของ setInterval

//   useEffect(() => {
//     if (callStatus === CALL_STATUS.INCALL) {
//       if (timerRef.current) clearInterval(timerRef.current); // เคลียร์ timer เก่าถ้ามีอยู่

//       // เริ่มต้น setInterval เพื่ออัปเดต secondsElapsed ทุก 1 วินาที
//       timerRef.current = setInterval(() => {
//         setSecondsElapsed((prevSeconds) => { // ใช้ functional update เพื่อให้ได้ค่า seconds ที่ถูกต้องเสมอ
//           const newSeconds = prevSeconds + 1;
//           const minutes = Math.floor(newSeconds / 60).toString().padStart(2, '0');
//           const remainingSeconds = (newSeconds % 60).toString().padStart(2, '0');
//           setCallTime(`${minutes}:${remainingSeconds}`); // อัปเดต state callTime (string) ที่ใช้แสดงผล
//           return newSeconds; // คืนค่า seconds ที่อัปเดตแล้วสำหรับ tick ถัดไป
//         });
//       }, 1000);
//     } else {
//       // เคลียร์ timer และรีเซ็ต state เมื่อไม่ได้อยู่ในสถานะโทร (เช่น วางสาย, มี Error)
//       if (timerRef.current) clearInterval(timerRef.current);
//       setCallTime('00:00');
//       setSecondsElapsed(0); // รีเซ็ต secondsElapsed กลับเป็น 0
//     }
//     // Cleanup function สำหรับ useEffect: จะทำงานเมื่อ Component unmount หรือ dependencies เปลี่ยน
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [callStatus]); // Effect นี้จะทำงานใหม่เมื่อ callStatus เปลี่ยนแปลงเท่านั้น

//   // =============== useEffect: Socket + WebRTC setup (ส่วนที่แก้ไขหลัก) ===============
//   useEffect(() => {
//     // ใช้ตัวแปรภายใน Effect สำหรับการ Cleanup ที่แม่นยำขึ้น
//     let currentSocket = null;
//     let currentLocalStream = null;
//     let currentPeer = null;

//     const setupCall = async () => {
//       // ตรวจสอบข้อมูลจำเป็น
//       if (!currentUser || !urlRoomId) {
//         setError("Missing user information or room ID for audio call.");
//         setCallStatus(CALL_STATUS.ERROR);
//         return;
//       }

//       const roomToJoin = urlRoomId;
//       setCurrentRoomId(roomToJoin); // ตั้งค่า Room ID ปัจจุบันใน store
//       setCallStatus(CALL_STATUS.CONNECTING); // ตั้งสถานะเริ่มต้นเป็น 'กำลังเชื่อมต่อ'
//       setParticipants([]); // เคลียร์ผู้เข้าร่วม
//       setError(null); // เคลียร์ error เก่า

//       try {
//         // -- 1. Get Local Media Stream --
//         const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
//         localStreamRef.current = stream; // Store in ref
//         currentLocalStream = stream; // Store locally for cleanup in this effect
//         if (localAudioRef.current) {
//           localAudioRef.current.srcObject = stream;
//         }

//         // -- 2. Initialize Socket.IO Client --
//         const socket = io(import.meta.env.VITE_API_BASE_URL, {
//           withCredentials: true, // ส่ง cookie ไปด้วย (สำคัญสำหรับการ Authentication)
//           transports: ['websocket'], // ใช้ WebSocket เป็นหลัก
//           query: { // ส่งข้อมูลเบื้องต้นไปกับ Connection
//             roomId: roomToJoin,
//             userId: currentUser.id,
//             userName: currentUser.firstName || currentUser.email,
//           },
//         });
//         socketRef.current = socket; // Store in ref
//         currentSocket = socket; // Store locally for cleanup

//         // -- 3. Socket.IO Event Listeners --
//         socket.on('connect', () => {
//           console.log('Socket.IO Connected for Audio Call:', socket.id);
//           socket.emit('joinRoom', { // ส่ง Event 'joinRoom' ไป Backend
//             roomId: roomToJoin,
//             userId: currentUser.id,
//             userName: currentUser.firstName || currentUser.email,
//             callType: 'audio', // ระบุว่าเป็น Audio Call
//           });
//           // ******** แก้ไขตำแหน่ง: setCallStatus(CALL_STATUS.INCALL) จะอยู่ตรงนี้ **********
//           // เพื่อให้มั่นใจว่า Stream พร้อมและเข้าร่วมห้องแล้ว ก่อนเปลี่ยนสถานะเป็น INCALL
//           setCallStatus(CALL_STATUS.INCALL);
//           console.log('Call status set to INCALL after joining room.');
//         });

//         socket.on('user-joined', (payload) => {
//           // Event เมื่อมีผู้ใช้อื่นเข้ามาร่วมห้อง (จาก Backend)
//           if (payload.userId !== currentUser.id) { // ถ้าไม่ใช่ตัวเราเอง
//             setParticipants((prev) => [...prev, { id: payload.userId, name: payload.userName }]);

//             // -- 4. Create Peer (initiator: คนที่เข้าห้องไปก่อน/เป็นคนโทรออก) --
//             const peer = new SimplePeer({
//               initiator: true,
//               trickle: true, // ตั้งค่าเป็น true ตามคำแนะนำก่อนหน้า
//               stream: currentLocalStream, // ใช้ currentLocalStream (ที่ได้จาก getLocalStream)
//               config: { // STUN/TURN servers สำหรับหาเส้นทางเชื่อมต่อ
//                 iceServers: [
//                   { urls: 'stun:stun.l.google.com:19302' }, // STUN server (หา public IP)
//                   // { urls: 'turn:your.turn.server:3478', username: 'user', credential: 'pass' }, // TURN server (สำหรับ NAT traversal ที่ซับซ้อน)
//                 ],
//               },
//             });

//             peerRef.current = peer; // เก็บ Peer instance ไว้ใน Ref
//             currentPeer = peer; // เก็บในตัวแปรภายใน Effect สำหรับ cleanup

//             peer.on('signal', (data) => {
//               // เมื่อ Peer สร้าง Signaling Data (Offer/Answer/ICE) ให้ส่งผ่าน Socket.IO ไปอีกฝ่าย
//               socket.emit('sending signal', { // ใช้ 'socket' ที่อยู่ใน Closure ของ Effect
//                 userToSignal: payload.userId, // ID ของผู้รับสัญญาณ
//                 callerID: currentUser.id, // ID ของผู้ส่งสัญญาณ
//                 signal: data, // ข้อมูล Signaling
//               });
//             });

//             peer.on('stream', (stream) => {
//               // เมื่อได้รับ Stream (เสียง) จาก Peer อีกฝ่าย
//               if (remoteAudioRef.current) {
//                 remoteAudioRef.current.srcObject = stream; // แสดงเสียงอีกฝ่าย
//               }
//             });

//             peer.on('error', (err) => {
//               // จัดการ Peer Connection Error
//               console.error('Peer error (initiator):', err);
//               setError(`Peer connection error: ${err.message}`);
//               setCallStatus(CALL_STATUS.ERROR);
//             });
//           }
//         });

//         socket.on('receiving signal', (payload) => {
//           // Event เมื่อได้รับ Signaling Data จากอีกฝ่าย (จาก Backend)
//           let peer = peerRef.current;
//           if (!peer) { // ถ้า Peer ยังไม่ถูกสร้าง (คือเราเป็นคนรับสาย/เข้าห้องทีหลัง)
//             peer = new SimplePeer({
//               initiator: false,
//               trickle: true, // ตั้งค่าเป็น true
//               stream: currentLocalStream, // ใช้ currentLocalStream
//               config: {
//                 iceServers: [
//                   { urls: 'stun:stun.l.google.com:19302' },
//                   // { urls: 'turn:your.turn.server:3478', username: 'user', credential: 'pass' },
//                 ],
//               },
//             });
//             peerRef.current = peer;
//             currentPeer = peer;

//             peer.on('signal', (data) => {
//               // เมื่อ Peer สร้าง Signaling Data ให้ส่งผ่าน Socket.IO ไปอีกฝ่าย
//               socket.emit('sending signal', { // ใช้ 'socket' ที่อยู่ใน Closure
//                 userToSignal: payload.callerID,
//                 callerID: currentUser.id,
//                 signal: data,
//               });
//             });

//             peer.on('stream', (stream) => {
//               // เมื่อได้รับ Stream จาก Peer อีกฝ่าย
//               if (remoteAudioRef.current) {
//                 remoteAudioRef.current.srcObject = stream;
//               }
//             });

//             peer.on('error', (err) => {
//               // จัดการ Peer Connection Error
//               console.error('Peer error (non-initiator):', err);
//               setError(`Peer connection error: ${err.message}`);
//               setCallStatus(CALL_STATUS.ERROR);
//             });
//           }
//           peer.signal(payload.signal); // ประมวลผล Signaling Data ที่ได้รับมา
//         });

//         socket.on('user-left', (userId) => {
//           // Event เมื่อผู้ใช้อื่นออกจากห้อง
//           setParticipants((prev) => prev.filter((p) => p.id !== userId)); // ลบออกจากรายชื่อผู้เข้าร่วม
//           if (peerRef.current) {
//             if (peerRef.current.connected || peerRef.current._connected) {
//               peerRef.current.destroy();
//             } else {
//               // ให้ delay เล็กน้อยกรณียังไม่ได้เชื่อมต่อ (ป้องกัน abort)
//               setTimeout(() => {
//                 if (peerRef.current) peerRef.current.destroy();
//               }, 1000);
//             }
//             peerRef.current = null;
//           }
//           if (remoteAudioRef.current && remoteAudioRef.current.srcObject) {
//             // หยุด Tracks ของ Remote Stream ก่อน null srcObject
//             remoteAudioRef.current.srcObject.getTracks().forEach(track => track.stop());
//             remoteAudioRef.current.srcObject = null;
//           }
//         });

//         socket.on('toggleMicStatus', (payload) => {
//           // Event เมื่อมีผู้ใช้อื่นปิด/เปิดไมค์
//           setParticipants((prev) =>
//             prev.map((p) => (p.id === payload.userId ? { ...p, isMicMuted: payload.isMuted } : p))
//           );
//         });

//         socket.on('disconnect', () => {
//           // Event เมื่อ Socket.IO หลุดการเชื่อมต่อ
//           console.log('Socket.IO Disconnected for Audio Call (on event).');
//           setCallStatus(CALL_STATUS.DISCONNECTED);
//           setError('Connection lost. Please try again.');
//           // ทำ Cleanup ต่างๆ
//           if (currentPeer) { currentPeer.destroy(); currentPeer = null; }
//           if (currentLocalStream) { currentLocalStream.getTracks().forEach((track) => track.stop()); currentLocalStream = null; }
//           if (remoteAudioRef.current && remoteAudioRef.current.srcObject) {
//             remoteAudioRef.current.srcObject.getTracks().forEach(track => track.stop());
//             remoteAudioRef.current.srcObject = null;
//           }
//         });

//         socket.on('connect_error', (err) => {
//           // Event เมื่อ Socket.IO เชื่อมต่อไม่สำเร็จ
//           console.error('Socket connection error:', err);
//           setCallStatus(CALL_STATUS.ERROR);
//           setError(err.message || 'Socket connection failed. Please check server status.');
//         });

//       } catch (err) {
//         console.error("Error in setupCall:", err);
//         setCallStatus(CALL_STATUS.ERROR);
//         setError(err.message || 'Failed to initialize call resources.');
//       }
//     };

//     setupCall(); // เรียกใช้ฟังก์ชัน setupCall เมื่อ Effect ถูก Mount

//     // -- Cleanup Function (ส่วนที่แก้ไข: จัดการ Cleanup ใน return ของ useEffect) --
//     // **นี่คือส่วนสำคัญที่สุดในการแก้ปัญหา Loop การเชื่อมต่อ**
//     return () => {
//       console.log("Cleaning up Audio CallingPage (useEffect return function)...");
//       // ใช้ตัวแปรที่ถูกเก็บไว้ใน closure ของ effect นี้ (currentSocket, currentLocalStream, currentPeer)
//       // เพื่อให้แน่ใจว่าเรา cleanup instance ที่ถูกต้อง
//       if (currentSocket) {
//         currentSocket.emit('leaveRoom', { roomId: urlRoomId, userId: currentUser.id }); // บอก Backend ว่าออกจากห้อง
//         currentSocket.disconnect(); // ตัดการเชื่อมต่อ Socket
//       }
//       if (currentLocalStream) {
//         currentLocalStream.getTracks().forEach((track) => track.stop()); // หยุดการใช้งานไมค์
//       }
//       if (currentPeer) {
//         currentPeer.destroy(); // ทำลาย Peer Connection
//       }
//       // เคลียร์ remote stream ด้วย
//       if (remoteAudioRef.current && remoteAudioRef.current.srcObject) {
//         remoteAudioRef.current.srcObject.getTracks().forEach(track => track.stop());
//         remoteAudioRef.current.srcObject = null;
//       }
//       // เคลียร์ refs ใน component's scope ให้เป็น null เพื่อความสมบูรณ์ (แม้จะถูกทำลายไปแล้ว)
//       socketRef.current = null;
//       localStreamRef.current = null;
//       peerRef.current = null;

//       clearTeleState(); // เคลียร์ Zustand store state
//       console.log("Cleanup complete (useEffect return).");
//     };
//     // eslint-disable-next-line
//   }, [urlRoomId, currentUser]); // <--- **ลด Dependencies เหลือแค่นี้เท่านั้น! (สำคัญมาก!)**
//   //       setCallStatus, setError, clearTeleState เป็น Zustand actions ที่ควรจะ stable แล้ว
//   //       การใส่พวกนี้เข้าไปใน Dependency Array ทำให้เกิด Loop การเชื่อมต่อซ้ำๆ

//   // =============== Handlers (แก้ไขส่วน cleanup ใน handleEndCall) ===============
//   const handleToggleMic = useCallback(() => {
//     const newMicMuted = !isMicMuted;
//     setMicMuted(newMicMuted);
//     if (localStreamRef.current) {
//       localStreamRef.current.getAudioTracks().forEach((track) => (track.enabled = !newMicMuted));
//     }
//     if (socketRef.current && socketRef.current.connected) {
//       socketRef.current.emit('toggleMic', {
//         roomId: currentRoomId,
//         userId: currentUser.id,
//         isMuted: newMicMuted,
//       });
//     }
//   }, [isMicMuted, setMicMuted, currentRoomId, currentUser]);

//   const handleEndCall = useCallback(() => {
//     setCallStatus(CALL_STATUS.DISCONNECTED);
//     // ทำ Cleanup ทันทีที่กดวางสาย
//     try {
//       if (socketRef.current) { // ตรวจสอบว่ามี socket instance อยู่
//         socketRef.current.emit('leaveRoom', { roomId: currentRoomId, userId: currentUser.id });
//         socketRef.current.disconnect(); // ตัดการเชื่อมต่อ Socket
//         socketRef.current = null; // เคลียร์ ref ทันที
//       }
//       if (localStreamRef.current) { // ตรวจสอบว่ามี stream อยู่
//         localStreamRef.current.getTracks().forEach((track) => track.stop()); // หยุดการใช้งานไมค์
//         localStreamRef.current = null; // เคลียร์ ref ทันที
//       }
//       if (peerRef.current) {
//         if (peerRef.current.connected || peerRef.current._connected) {
//           peerRef.current.destroy();
//         } else {
//           // ให้ delay เล็กน้อยกรณียังไม่ได้เชื่อมต่อ (ป้องกัน abort)
//           setTimeout(() => {
//             if (peerRef.current) peerRef.current.destroy();
//           }, 1000);
//         }
//         peerRef.current = null;
//       }
//       if (remoteAudioRef.current && remoteAudioRef.current.srcObject) { // ตรวจสอบ remote stream
//         remoteAudioRef.current.srcObject.getTracks().forEach(track => track.stop());
//         remoteAudioRef.current.srcObject = null;
//       }
//     } catch (error) {
//       console.error("Error during end call cleanup:", error);
//     } finally {
//       // Clear Zustand store state
//       clearTeleState(); // เคลียร์ store
//       navigate('/'); // กลับไปหน้า Home
//     }
//   }, [setCallStatus, currentRoomId, currentUser, navigate, clearTeleState]);

//   // =============== Render ===============
//   if (!currentUser) {
//     return <div className="text-center py-4">Please log in to make a call.</div>;
//   }


//   if (callStatus === CALL_STATUS.ERROR || callStatus === CALL_STATUS.DISCONNECTED) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
//         <div className="text-center p-6 bg-white rounded-lg shadow-xl">
//           <h2 className="text-2xl font-bold mb-4">Audio Call Error</h2>
//           <p className="text-lg">{teleError || 'An unexpected error occurred during the call.'}</p>
//           <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }
//   const participantsSafe = Array.isArray(participants) ? participants : [];
//   const otherParticipant = participantsSafe.find(p => p.id !== currentUser?.id);
//   const otherParticipantName = otherParticipant?.name || 'Connecting...';

//   return (
//     <div className="font-prompt">
//       {/* --- AUDIO TAGS FOR WEBRTC STREAMS --- */}
//       {/* <audio ref={localAudioRef} autoPlay playsInline hidden />  */}
//       <audio ref={localAudioRef} autoPlay muted playsInline hidden />
//       <audio ref={remoteAudioRef} autoPlay playsInline />

//       <Brandner title="การโทรด้วยเสียง" />
//       <div className="px-10 py-5">
//         <CallAndVideo
//           user={{
//             name: currentUser.firstName || currentUser.email,
//             avatar: currentUser.profilePictureUrl || 'https://www.svgrepo.com/show/530412/user.svg',
//           }}
//           doctor={{
//             name: otherParticipantName,
//             avatar:
//               'https://res.cloudinary.com/dhoyopcr7/image/upload/v1753972209/%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%84%E0%B8%97%E0%B8%A2_bn2nf6.jpg',
//           }}
//           localUserAvatar={currentUser.profilePictureUrl || 'https://www.svgrepo.com/show/530412/user.svg'}
//           callStatus={callStatus}
//           callTime={callTime}
//           isMicMuted={isMicMuted}
//           onToggleMic={handleToggleMic}
//           onEndCall={handleEndCall}
//           isAudioOnly={true}
//           localAudioRef={localAudioRef}
//           remoteAudioRef={remoteAudioRef}
//         />
//         {/* แสดงเวลาโทรอีกครั้งที่ด้านล่าง */}
//         <div className="text-center text-gray-500 mt-3">เวลาโทร: {callTime}</div>
//       </div>
//     </div>
//   );
// }

// export default CallingPage;


import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import teleStore, { CALL_STATUS } from '../../../stores/teleStore.js';
import authStore from '../../../stores/authStore.js';
import { Device } from '@twilio/voice-sdk';
import Brandner from '../../../components/Brandner.jsx';
import CallAndVideo from '../../../components/callandvideo/CallAndVideo.jsx';
import teleApi from '../../../api/teleApi.js';

function CallingPage() {
    const { roomId: urlRoomId } = useParams();
    const navigate = useNavigate();
    const currentUser = authStore((state) => state.user);

    // Zustand selectors
    const callStatus = teleStore((state) => state.callStatus);
    const setCallStatus = teleStore((state) => state.setCallStatus);
    const setError = teleStore((state) => state.setError);
    const clearTeleState = teleStore((state) => state.clearTeleState);
    const teleError = teleStore((state) => state.error);
    const isMicMuted = teleStore((state) => state.isMicMuted);
    const setMicMuted = teleStore((state) => state.setMicMuted);

    // State
    const [callTime, setCallTime] = useState('00:00');
    const timerRef = useRef(null);

    // Refs for Twilio
    const deviceRef = useRef(null);
    const activeConnectionRef = useRef(null);

    // =============== useEffect1: Call Setup with Twilio Voice SDK ===============
    // useEffect(() => {
    //   console.log('Start useEffect1: Call Setup with Twilio Voice SDK')
    //     if (!currentUser || !urlRoomId) {
    //         setError("Missing user information or room ID for audio call.");
    //         setCallStatus(CALL_STATUS.ERROR);
    //         return;
    //     }

    //     const setupTwilioDevice = async () => {
    //       console.log('Start setupTwilioDevice')
    //         try {
    //             setCallStatus(CALL_STATUS.CONNECTING);
    //             setError(null);

    //             // 1. Fetch Twilio Voice Token from our backend
    //             const twilioToken = await teleApi.getTwilioVoiceToken(currentUser.id);
    //             console.log('twilioToken', twilioToken)

    //             // 2. Initialize Twilio Device with the token
    //             const device = new Device(twilioToken, {
    //                 logLevel: import.meta.env.DEV ? 1 : 0, 
    //             });
    //             console.log('device', device)
    //             deviceRef.current = device;

    //             // 3. Set up event listeners for the Device
    //             device.on('error', (error) => {
    //                 console.error('Twilio Device error:', error);
    //                 setError(`Twilio Device error: ${error.message}`);
    //                 setCallStatus(CALL_STATUS.ERROR);
    //             });

    //             // This handles an incoming call. The `accept()` method starts the call.
    //             device.on('incoming', (connection) => {
    //                 console.log('Incoming call from:', connection.parameters.From);
    //                 connection.accept();
    //                 activeConnectionRef.current = connection;
    //                 setCallStatus(CALL_STATUS.INCALL);
    //             });

    //             // 4. Make an outbound call to the specified `roomId`
    //             // Twilio will handle the signaling and connection
    //             const connection = device.connect({
    //                 params: {
    //                     To: urlRoomId, // Use the roomId as the "To" number
    //                     From: currentUser.id, // Your user's ID
    //                 }
    //             });
    //             console.log('connection', connection)
    //             activeConnectionRef.current = connection;
                
    //             connection.on('accept', () => {
    //                 console.log('Call accepted!');
    //                 setCallStatus(CALL_STATUS.INCALL);
    //             });

    //             connection.on('disconnect', () => {
    //                 console.log('Call disconnected.');
    //                 setCallStatus(CALL_STATUS.DISCONNECTED);
    //                 // No need to navigate here, let the useEffect cleanup handle it.
    //             });

    //             connection.on('cancel', () => {
    //                 console.log('Call cancelled.');
    //                 setCallStatus(CALL_STATUS.DISCONNECTED);
    //                 // No need to navigate here, let the useEffect cleanup handle it.
    //             });
    //         } catch (err) {
    //             console.error("Error setting up Twilio device:", err);
    //             setError(err.message || 'Failed to initialize Twilio voice call.');
    //             setCallStatus(CALL_STATUS.ERROR);
    //         }
    //     };
    //     console.log('setupTwilioDevice', setupTwilioDevice)
    //     setupTwilioDevice();

    //     // Cleanup function for useEffect
    //     return () => {
    //         console.log("Cleaning up CallingPage...");
    //         if (deviceRef.current) {
    //             deviceRef.current.disconnectAll();
    //             deviceRef.current.destroy();
    //         }
    //         clearTeleState();
    //     };
    // }, [urlRoomId, currentUser, navigate, setCallStatus, setError, clearTeleState]);


    useEffect(() => {
        console.log('useEffect1: Call Setup with Twilio Voice SDK')
        if (!currentUser || !urlRoomId) {
            setError("Missing user information or room ID for audio call.");
            setCallStatus(CALL_STATUS.ERROR);
            return;
        }

        const setupTwilioDevice = async () => {
            try {
                setCallStatus(CALL_STATUS.CONNECTING);
                setError(null);

                const twilioToken = await teleApi.getTwilioVoiceToken(currentUser.id);

                const device = new Device(twilioToken, {
                    logLevel: import.meta.env.DEV ? 1 : 0,
                });
                console.log('device', device)
                deviceRef.current = device;

                device.on('error', (error) => {
                    console.error('Twilio Device error:', error);
                    setError(`Twilio Device error: ${error.message}`);
                    setCallStatus(CALL_STATUS.ERROR);
                });

                // แก้ไข: ย้าย Event Listener ของ connection เข้ามาในนี้
                device.on('connect', (connection) => {
                    console.log('Call established!', connection);
                    activeConnectionRef.current = connection;
                    setCallStatus(CALL_STATUS.INCALL);

                    connection.on('disconnect', () => {
                        console.log('Call disconnected.');
                        setCallStatus(CALL_STATUS.DISCONNECTED);
                    });
                });

                device.on('disconnect', () => {
                    console.log('Device disconnected.');
                    setCallStatus(CALL_STATUS.DISCONNECTED);
                });

                // เริ่มการโทรออก
                device.connect({
                    params: {
                        To: urlRoomId,
                        From: currentUser.id,
                    }
                });

            } catch (err) {
                console.error("Error setting up Twilio device:", err);
                setError(err.message || 'Failed to initialize Twilio voice call.');
                setCallStatus(CALL_STATUS.ERROR);
            }
        };
        console.log('setupTwilioDevice', setupTwilioDevice)
        setupTwilioDevice();

        // Cleanup function for useEffect
        return () => {
            console.log("Cleaning up CallingPage...");
            if (deviceRef.current) {
                deviceRef.current.disconnectAll();
                deviceRef.current.destroy();
            }
            clearTeleState();
        };
    }, [urlRoomId, currentUser, navigate, setCallStatus, setError, clearTeleState]);

    // =============== useEffect2: Call Timer & Handlers ===============
    useEffect(() => {
      console.log('Start useEffect2: Call Timer & Handlers')
        if (callStatus === CALL_STATUS.INCALL) {
            if (timerRef.current) clearInterval(timerRef.current);
            let secondsElapsed = 0;
            timerRef.current = setInterval(() => {
                secondsElapsed++;
                const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
                const remainingSeconds = (secondsElapsed % 60).toString().padStart(2, '0');
                setCallTime(`${minutes}:${remainingSeconds}`);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setCallTime('00:00');
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [callStatus]);

    const handleToggleMic = useCallback(() => {
        const connection = activeConnectionRef.current;
        if (connection) {
            const isCurrentlyMuted = connection.isMuted();
            connection.mute(!isCurrentlyMuted);
            setMicMuted(!isCurrentlyMuted);
            console.log(`Microphone muted: ${!isCurrentlyMuted}`);
        }
    }, [setMicMuted]);
    console.log('handleToggleMic', handleToggleMic)

    const handleEndCall = useCallback(() => {
        const connection = activeConnectionRef.current;
        if (connection) {
            connection.disconnect();
        }
        // The disconnect event will trigger the rest of the cleanup.
    }, []);
    console.log('handleEndCall', handleEndCall)

    // =============== Render ===============
    if (!currentUser) {
        return <div className="text-center py-4">Please log in to make a call.</div>;
    }
    
    if (callStatus === CALL_STATUS.ERROR || callStatus === CALL_STATUS.DISCONNECTED) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
                <div className="text-center p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Audio Call Error</h2>
                    <p className="text-lg">{teleError || 'An unexpected error occurred during the call.'}</p>
                    <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    const otherParticipantName = 'คู่สนทนา';
    console.log('otherParticipantName', otherParticipantName)

    return (
        <div className="font-prompt">
            <Brandner title="การโทรด้วยเสียง" />
            <div className="px-10 py-5">
                <CallAndVideo
                    user={{
                        name: currentUser.firstName || currentUser.email,
                        avatar: currentUser.profilePictureUrl || 'https://www.svgrepo.com/show/530412/user.svg',
                    }}
                    doctor={{
                        name: otherParticipantName,
                        avatar: 'https://res.cloudinary.com/dhoyopcr7/image/upload/v1753972209/%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%84%E0%B8%97%E0%B8%A2_bn2nf6.jpg',
                    }}
                    localUserAvatar={currentUser.profilePictureUrl || 'https://www.svgrepo.com/show/530412/user.svg'}
                    callStatus={callStatus}
                    callTime={callTime}
                    isMicMuted={isMicMuted}
                    onToggleMic={handleToggleMic}
                    onEndCall={handleEndCall}
                    isAudioOnly={true}
                    localAudioRef={null}
                    remoteAudioRef={null}
                />
            </div>
        </div>
    );
}

export default CallingPage;
