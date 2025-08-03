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
