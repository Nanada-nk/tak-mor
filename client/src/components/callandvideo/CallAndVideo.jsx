
import { Phone, Video, Mic } from "lucide-react"

function CallAndVideo() {
    const user = {
        name: 'Deny Hendrawan',
        status: 'Online',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL รูปโปรไฟล์ผู้ใช้
    };

    const doctor = {
        name: 'Dr. Michael Brown',
        avatar: 'https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg', // URL รูปแพทย์กลางจอ
    };

    const localUserAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // URL รูปผู้ใช้มุมขวา (ตัวเอง)

    const callTime = '00:24'; // เวลาที่ใช้ในการโทร
    return (
        <div className="flex flex-col h-screen  p-4">
            <div className="bg-white rounded-lg shadow-xl flex-grow flex flex-col overflow-hidden">
                {/* Top Bar / Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-blue-500"
                        />
                        <div>
                            <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.status}</p>
                        </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition duration-150">
                        {/* User Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
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

                {/* Main Video Area */}
                <div className="relative flex-grow flex items-center justify-center bg-gray-50">
                    {/* Doctor's Video Feed (Central) */}
                    <div className="text-center">
                        <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-blue-400 shadow-lg"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                        <p className="text-gray-600 text-sm">{callTime}</p>
                    </div>

                    {/* Local User's Small Video Feed (Bottom Right) */}
                    <div className="absolute bottom-4 right-4 w-24 h-24 rounded-lg overflow-hidden border-2 border-white shadow-md">
                        <img
                            src={localUserAvatar}
                            alt="You"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="flex justify-center items-center p-4 bg-white border-t border-gray-200 space-x-4">
                    {/* Video Toggle */}
                    <button className="p-3 bg-gray-300 text-white rounded-full shadow-md hover:bg-red-600 transition duration-150">
                        <Video />
                    </button>

                    {/* Call End Button */}
                    <button className="p-3 bg-red-400 text-white rounded-full shadow-md hover:bg-red-600 transition duration-150">
                        <Phone />
                    </button>

                    {/* Microphone Toggle */}
                    <button className="p-3 bg-gray-300 text-white rounded-full shadow-md hover:bg-red-600 transition duration-150">
                        <Mic />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CallAndVideo