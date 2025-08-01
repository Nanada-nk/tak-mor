import { Phone, Video, Mic, MicOff } from "lucide-react";
import { CALL_STATUS } from '../../stores/teleStore.js';

function CallAndVideo({
    user,               // { name, avatar, status }
    doctor,             // { name, avatar }
    localUserAvatar,
    callStatus,
    callTime = '00:00', // << รับ callTime จาก props
    isMicMuted,
    onToggleMic,
    onEndCall,
    isAudioOnly = false,
    localAudioRef,
    remoteAudioRef,
}) {
    return (
        <div className="flex flex-col h-full p-4 font-prompt mt">
            <div className="bg-white rounded-lg shadow-xl flex-grow flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <img
                            src={user.avatar || 'https://www.svgrepo.com/show/453054/guy-blank.svg'}
                            alt={`${user.name}'s profile`}
                            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-blue-500"
                        />
                        <div>
                            <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.status || 'Online'}</p>
                        </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition duration-150" aria-label="User Menu">
                        <svg
                            xmlns="https://res.cloudinary.com/dhoyopcr7/image/upload/v1753282411/takmor_2_vkivfo.png"
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <div className="relative flex-grow flex items-center justify-center bg-gray-50 py-4">
                    <div className="text-center">
                        <img
                            src={doctor.avatar || 'https://www.svgrepo.com/show/453042/doctor-m.svg'}
                            alt={`Doctor's profile`}
                            className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-blue-400 shadow-lg"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                        <p className="text-gray-600 text-sm">{callTime}</p>
                    </div>
                    {/* Local User's Avatar */}
                    <div className="absolute bottom-4 right-4 w-24 h-24 rounded-lg overflow-hidden border-2 border-white shadow-md">
                        <img
                            src={localUserAvatar || 'https://www.svgrepo.com/show/532363/user-alt-1.svg'}
                            alt="Your profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Call Status Overlay */}
                    {callStatus !== CALL_STATUS.INCALL && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 text-white text-2xl">
                            {callStatus === CALL_STATUS.CONNECTING && 'Connecting...'}
                            {callStatus === CALL_STATUS.RINGING && 'Ringing...'}
                            {callStatus === CALL_STATUS.DISCONNECTED && 'Call Ended'}
                            {callStatus === CALL_STATUS.IDLE && 'Ready to Call'}
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center p-4 bg-white border-t border-gray-200 space-x-4">
                    {!isAudioOnly && (
                        <button
                            className="p-3 rounded-full shadow-md transition duration-150 bg-gray-300 text-gray-800 hover:bg-gray-400"
                            aria-label="Toggle Video"
                            disabled={callStatus !== CALL_STATUS.INCALL}
                        >
                            <Video />
                        </button>
                    )}
                    <button
                        onClick={onEndCall}
                        className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-150"
                        aria-label="End Call"
                        disabled={callStatus !== CALL_STATUS.INCALL}
                    >
                        <Phone />
                    </button>
                    <button
                        onClick={onToggleMic}
                        className={`p-3 rounded-full shadow-md transition duration-150 ${isMicMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                            }`}
                        aria-label={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                        disabled={callStatus !== CALL_STATUS.INCALL}
                    >
                        {isMicMuted ? <MicOff /> : <Mic />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CallAndVideo;
