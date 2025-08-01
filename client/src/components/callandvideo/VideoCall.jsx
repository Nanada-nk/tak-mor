import { useEffect, useRef, useState, useCallback } from 'react';
import { Phone, Video, Mic, MicOff, VideoOff } from "lucide-react";
import { useNavigate } from 'react-router';
import teleStore, { CALL_STATUS } from '../../stores/teleStore.js';
import authStore from '../../stores/authStore.js';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';

function VideoCall({ roomId: urlRoomId, appointmentData }) {
  const navigate = useNavigate();
  const currentUser = authStore((state) => state.user);

  // Zustand selectors
  const callStatus = teleStore((state) => state.callStatus);
  const participants = teleStore((state) => state.participants);
  const currentRoomId = teleStore((state) => state.currentRoomId);
  const isMicMuted = teleStore((state) => state.isMicMuted);
  const isCameraOff = teleStore((state) => state.isCameraOff);
  const setCallStatus = teleStore((state) => state.setCallStatus);
  const setParticipants = teleStore((state) => state.setParticipants);
  const setCurrentRoomId = teleStore((state) => state.setCurrentRoomId);
  const setMicMuted = teleStore((state) => state.setMicMuted);
  const setCameraOff = teleStore((state) => state.setCameraOff);
  const setError = teleStore((state) => state.setError);
  const teleError = teleStore((state) => state.error); // ดึง error จาก store
  const clearTeleState = teleStore((state) => state.clearTeleState); // ดึง clearTeleState

  const socketRef = useRef(null);
  const localVideoRef = useRef(null); // Ref สำหรับ video ของตัวเอง
  const remoteVideoRef = useRef(null); // Ref สำหรับ video ของอีกฝ่าย
  const peerRef = useRef(null);
  const localStreamRef = useRef(null); // Ref สำหรับ Media Stream (กล้อง/ไมค์)

  // --- Call Timer --- (แก้ไขส่วนนี้)
  const [callTime, setCallTime] = useState('00:00');
  const [secondsElapsed, setSecondsElapsed] = useState(0); // <--- เพิ่ม STATE นี้สำหรับนับวินาที
  const timerRef = useRef(null);

  // --- Handlers (ส่วนที่แก้ไข: เพิ่มการเคลียร์ ref ใน handleEndCall) ---

  useEffect(() => {
    if (callStatus === CALL_STATUS.INCALL) {
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setSecondsElapsed((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          const minutes = Math.floor(newSeconds / 60).toString().padStart(2, '0');
          const remainingSeconds = (newSeconds % 60).toString().padStart(2, '0');
          setCallTime(`${minutes}:${remainingSeconds}`);
          return newSeconds;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallTime('00:00');
      setSecondsElapsed(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  // --- useEffect: WebRTC + Socket.IO setup ---
  useEffect(() => {
    let currentSocket = null;
    let currentLocalStream = null;
    let currentPeer = null;

    const setupCall = async () => {
      if (!currentUser || !urlRoomId || !appointmentData) {
        setError("Missing user information, room ID, or appointment data.");
        setCallStatus(CALL_STATUS.ERROR);
        return;
      }

      setCurrentRoomId(urlRoomId);
      setCallStatus(CALL_STATUS.CONNECTING);
      setError(null);
      setParticipants([]);

      try {
        // 1. Get Local Media Stream (Camera & Mic)
        if (!navigator.mediaDevices?.getUserMedia) {
          setError('เบราว์เซอร์ไม่รองรับการใช้กล้อง/ไมค์ กรุณาเปลี่ยนเบราว์เซอร์');
          setCallStatus(CALL_STATUS.ERROR);
          throw new Error('MediaDevices not supported');
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log('✅ getUserMedia success', stream);
        localStreamRef.current = stream;
        currentLocalStream = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          console.log('✅ Set srcObject for localVideoRef', localVideoRef.current);
        }

        // 2. Initialize Socket.IO
        const socket = io(import.meta.env.VITE_API_BASE_URL, {
          withCredentials: true,
          transports: ['websocket'],
          query: { roomId: urlRoomId, userId: currentUser.id, userName: currentUser.firstName || currentUser.email },
        });
        socketRef.current = socket;
        currentSocket = socket;

        // 3. Socket.IO Event Listeners
        socket.on('connect', async () => {
          console.log('🟢 Socket.IO Connected for Video Call:', socket.id);
          socket.emit('joinRoom', {
            roomId: urlRoomId,
            userId: currentUser.id,
            userName: currentUser.firstName || currentUser.email,
            callType: 'video'
          });
          setCallStatus(CALL_STATUS.INCALL);
          console.log('🟢 Call status set to INCALL after joining room.');
        });

        socket.on('user-joined', (payload) => {
          console.log('👥 user-joined', payload);
          if (payload.userId !== currentUser.id) {
            setParticipants((prev) => [...prev, { id: payload.userId, name: payload.userName }]);
            const peer = new SimplePeer({
              initiator: true,
              trickle: true,
              stream: currentLocalStream,
              config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
            });
            peerRef.current = peer; currentPeer = peer;

            peer.on('signal', (data) => {
              console.log('📡 [initiator] peer.signal', data);
              socket.emit('sending signal', { userToSignal: payload.userId, callerID: currentUser.id, signal: data });
            });
            peer.on('stream', (stream) => {
              console.log('🎥 [initiator] peer.stream (remote video)', stream);
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
                console.log('✅ Set srcObject for remoteVideoRef', remoteVideoRef.current);
              }
            });
            peer.on('error', (err) => {
              console.error('❌ Peer error (initiator):', err);
              setError(`Peer connection error: ${err.message}`);
              setCallStatus(CALL_STATUS.ERROR);
            });
          }
        });

        socket.on('receiving signal', (payload) => {
          console.log('🔄 receiving signal', payload);
          let peer = peerRef.current;
          if (!peer) {
            peer = new SimplePeer({
              initiator: false,
              trickle: true,
              stream: currentLocalStream,
              config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
            });
            peerRef.current = peer; currentPeer = peer;

            peer.on('signal', (data) => {
              console.log('📡 [non-initiator] peer.signal', data);
              socket.emit('sending signal', { userToSignal: payload.callerID, callerID: currentUser.id, signal: data });
            });
            peer.on('stream', (stream) => {
              console.log('🎥 [non-initiator] peer.stream (remote video)', stream);
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
                console.log('✅ Set srcObject for remoteVideoRef', remoteVideoRef.current);
              }
            });
            peer.on('error', (err) => {
              console.error('❌ Peer error (non-initiator):', err);
              setError(`Peer connection error: ${err.message}`);
              setCallStatus(CALL_STATUS.ERROR);
            });
          }
          peer.signal(payload.signal);
        });

        socket.on('user-left', (userId) => {
          console.log('👋 user-left', userId);
          setParticipants((prev) => prev.filter(p => p.id !== userId));
          if (peerRef.current) {
            if (peerRef.current.connected || peerRef.current._connected) {
              peerRef.current.destroy();
            } else {
              // ให้ delay เล็กน้อยกรณียังไม่ได้เชื่อมต่อ (ป้องกัน abort)
              setTimeout(() => {
                if (peerRef.current) peerRef.current.destroy();
              }, 1000);
            }
            peerRef.current = null;
          }
          if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
            remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            remoteVideoRef.current.srcObject = null;
            console.log('🗑️ Cleared remoteVideoRef srcObject');
          }
        });

        socket.on('toggleMicStatus', (payload) => {
          console.log('🎤 toggleMicStatus', payload);
          setParticipants(prev => prev.map(p => p.id === payload.userId ? { ...p, isMicMuted: payload.isMuted } : p));
        });
        socket.on('toggleCameraStatus', (payload) => {
          console.log('📷 toggleCameraStatus', payload);
          setParticipants(prev => prev.map(p => p.id === payload.userId ? { ...p, isCameraOff: payload.isCameraOff } : p));
        });

        socket.on('disconnect', () => {
          console.warn('🔌 Socket.IO Disconnected for Video Call (on event).');
          setCallStatus(CALL_STATUS.DISCONNECTED);
          setError('Connection lost. Please try again.');
          if (currentPeer) { currentPeer.destroy(); currentPeer = null; }
          if (currentLocalStream) { currentLocalStream.getTracks().forEach((track) => track.stop()); currentLocalStream = null; }
          if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
            remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            remoteVideoRef.current.srcObject = null;
          }
        });

        socket.on('connect_error', (err) => {
          console.error('❌ Socket connection error:', err);
          setCallStatus(CALL_STATUS.ERROR);
          setError(err.message || 'Socket connection failed.');
        });

      } catch (err) {
        console.error("❌ Error in setupCall:", err);
        setCallStatus(CALL_STATUS.ERROR);
        setError(err.message || 'Failed to initialize call resources.');
      }
    };

    setupCall();

    // --- Cleanup Function ---
    return () => {
      console.log("🧹 Cleaning up VideoCall (useEffect return function)...");
      if (currentSocket) {
        currentSocket.emit('leaveRoom', { roomId: urlRoomId, userId: currentUser.id });
        currentSocket.disconnect();
      }
      if (currentLocalStream) {
        currentLocalStream.getTracks().forEach((track) => track.stop());
      }
      if (currentPeer) {
        currentPeer.destroy();
      }
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
        remoteVideoRef.current.srcObject = null;
        console.log('🗑️ Cleared remoteVideoRef srcObject on cleanup');
      }
      socketRef.current = null;
      localStreamRef.current = null;
      peerRef.current = null;

      clearTeleState();
      console.log("🧹 Cleanup complete (useEffect return).");
    };
    // eslint-disable-next-line
  }, []);

  const handleToggleMic = useCallback(() => {
    const newMicMuted = !isMicMuted;
    setMicMuted(newMicMuted);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => (track.enabled = !newMicMuted));
    }
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('toggleMic', { roomId: currentRoomId, userId: currentUser.id, isMuted: newMicMuted });
    }
  }, [isMicMuted, setMicMuted, currentRoomId, currentUser]);

  const handleToggleCamera = useCallback(() => {
    const newCameraOff = !isCameraOff;
    setCameraOff(newCameraOff);
    if (localStreamRef.current && localStreamRef.current.getVideoTracks().length > 0) { // ตรวจสอบว่ามี Video Track
      localStreamRef.current.getVideoTracks().forEach(track => (track.enabled = !newCameraOff)); // ปิด/เปิด Track วิดีโอตัวเอง
    }
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('toggleCamera', { roomId: currentRoomId, userId: currentUser.id, isCameraOff: newCameraOff });
    }
  }, [isCameraOff, setCameraOff, currentRoomId, currentUser]);

  const handleEndCall = useCallback(() => {
    setCallStatus(CALL_STATUS.DISCONNECTED);
    // ทำ Cleanup ทันทีที่กดวางสาย
    try {
      if (socketRef.current) {
        socketRef.current.emit('leaveRoom', { roomId: currentRoomId, userId: currentUser.id });
        socketRef.current.disconnect(); // ตัดการเชื่อมต่อ Socket
        socketRef.current = null; // เคลียร์ ref ทันที
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop()); // หยุดการใช้งานกล้อง/ไมค์
        localStreamRef.current = null; // เคลียร์ ref ทันที
      }
      if (peerRef.current) {
        if (peerRef.current.connected || peerRef.current._connected) {
          peerRef.current.destroy();
        } else {
          // ให้ delay เล็กน้อยกรณียังไม่ได้เชื่อมต่อ (ป้องกัน abort)
          setTimeout(() => {
            if (peerRef.current) peerRef.current.destroy();
          }, 1000);
        }
        peerRef.current = null;
      }
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) { // ตรวจสอบ remote stream
        remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
        remoteVideoRef.current.srcObject = null;
      }
    } catch (error) {
      console.error("Error during end call cleanup:", error);
    } finally {
      clearTeleState(); // เคลียร์ store
      navigate('/'); // กลับไปหน้า Home
    }
  }, [setCallStatus, currentRoomId, currentUser, navigate, clearTeleState]);

  // --- Render Logic ---
  if (!currentUser) {
    return <div className="text-center py-4">Please log in to make a video call.</div>;
  }

  // ใช้ teleError ที่ดึงมาจาก store
  if (callStatus === CALL_STATUS.ERROR || callStatus === CALL_STATUS.DISCONNECTED) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
        <div className="text-center p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Video Call Error</h2>
          <p className="text-lg">{teleError || 'An unexpected error occurred during the call.'}</p>
          <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // UI สำหรับสถานะ CONNECTING
  if (callStatus === CALL_STATUS.CONNECTING) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <div className="text-lg text-blue-200 font-semibold">กำลังเชื่อมต่อ...</div>
        </div>
      </div>
    );
  }

  // UI หลักของการโทร เมื่ออยู่ในสถานะ INCALL
  const participantsSafe = Array.isArray(participants) ? participants : [];
  const otherParticipant = participantsSafe.find(p => p.id !== currentUser?.id);
  const otherParticipantName = otherParticipant?.name || 'Connecting...';

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-white font-prompt">
      <div className="bg-gray-800 rounded-lg shadow-xl flex-grow flex flex-col overflow-hidden">
        {/* Top Bar / Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <img
              src={currentUser.profilePictureUrl || 'https://placehold.co/40x40/000000/FFFFFF?text=ME'}
              alt={currentUser.firstName || currentUser.email}
              className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-blue-500"
            />
            <div>
              <p className="font-semibold text-lg text-gray-100">{currentUser.firstName || currentUser.email}</p>
              <p className="text-sm text-gray-400">Room ID: {currentRoomId || '-'}</p>
            </div>
          </div>
          <div className="text-xl font-bold text-blue-400">{callTime}</div> {/* เวลาโทร */}
        </div>

        {/* Video Streams Area */}
        <div className="relative flex-grow flex items-center justify-center bg-gray-900 rounded-b-lg">
          {/* Remote Video */}
          {otherParticipant ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover rounded-lg shadow-lg"
              ></video>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium">
                {otherParticipantName}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-2xl animate-pulse">
              Waiting for {otherParticipantName}...
            </div>
          )}

          {/* Local Video (Picture-in-Picture) */}
          <div className={`absolute bottom-4 right-4 w-32 h-24 sm:w-48 sm:h-36 lg:w-64 lg:h-48 bg-gray-700 rounded-lg shadow-lg overflow-hidden border-2 ${isCameraOff ? 'border-red-500' : 'border-blue-500'}`}>
            {isCameraOff ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-700">
                <VideoOff className="w-12 h-12 text-gray-400" />
              </div>
            ) : (
              <video
                ref={localVideoRef}
                muted
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              ></video>
            )}
            <div className="absolute top-1 left-1 bg-black bg-opacity-50 px-2 py-0.5 rounded-full text-xs font-medium">
              You
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center items-center p-4 bg-gray-800 rounded-t-lg border-t border-gray-700">
          {/* Mic Toggle */}
          <button
            onClick={handleToggleMic}
            className={`p-3 rounded-full mx-2 transition-all duration-300
              ${isMicMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
              text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label={isMicMuted ? "Unmute microphone" : "Mute microphone"}
            disabled={callStatus !== CALL_STATUS.INCALL}
          >
            {isMicMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {/* Camera Toggle */}
          <button
            onClick={handleToggleCamera}
            className={`p-3 rounded-full mx-2 transition-all duration-300
              ${isCameraOff ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
              text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label={isCameraOff ? "Turn on camera" : "Turn off camera"}
            disabled={callStatus !== CALL_STATUS.INCALL}
          >
            {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="p-3 rounded-full mx-2 bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="End call"
            disabled={callStatus !== CALL_STATUS.INCALL}
          >
            <Phone size={24} style={{ transform: "rotate(135deg)" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCall;




