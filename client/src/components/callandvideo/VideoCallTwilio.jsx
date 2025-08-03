import { useEffect, useRef, useState } from 'react';
import { connect, createLocalTracks } from 'twilio-video';
import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react'
import { useNavigate } from 'react-router';

const VideoCallTwilio = ({ roomId, appointmentData, twilioToken }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [statusMessage, setStatusMessage] = useState('กำลังเชื่อมต่อ...');
  const [activeRoom, setActiveRoom] = useState(null);
  const localTracksRef = useRef([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    console.log('useEffect VideoCallTwilio')

    if (!twilioToken || !roomId || !appointmentData) {
      return;
    }

    let isMounted = true;
    let currentRoom;

    const connectToRoom = async () => {
      try {
        // 1. สร้าง Local Tracks (กล้องและไมโครโฟน)
        setStatusMessage('กำลังเข้าถึงกล้องและไมโครโฟน...');
        const tracks = await createLocalTracks({
          audio: true,
          video: { width: 640 }
        });
        console.log('tracks', tracks)

        if (!isMounted) {
          tracks.forEach(track => track.stop());
          return;
        }

        // เก็บ tracks ไว้ใน ref
        localTracksRef.current = tracks;

        tracks.forEach(track => {
          const trackElement = track.attach();
          if (localVideoRef.current) {
            localVideoRef.current.appendChild(trackElement);
          }
          console.log('trackElement', trackElement)
        });

        // 2. เชื่อมต่อกับ Twilio Room โดยใช้ Twilio Token ที่ได้รับมา
        setStatusMessage(`กำลังเข้าร่วมห้อง ${roomId}...`);
        const room = await connect(twilioToken, {
          name: roomId,
          tracks: tracks,
        });
        console.log('room', room)

        if (!isMounted) {
          room.disconnect();
          return;
        }

        currentRoom = room;
        setActiveRoom(room);
        setStatusMessage(`เชื่อมต่อสำเร็จแล้วค่ะ! ห้อง: ${room.name}`);
        console.log(`เข้าร่วม Room ได้สำเร็จ: ${room.name}`);

        room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track;
              if (remoteVideoRef.current) {
                remoteVideoRef.current.appendChild(track.attach());
              }
            }
          });
          participant.on('trackSubscribed', track => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.appendChild(track.attach());
            }
          });
        });

        // 3. จัดการเหตุการณ์เมื่อมีผู้เข้าร่วมใหม่
        room.on('participantConnected', participant => {
          console.log(`ผู้ใช้ "${participant.identity}" เข้าร่วมค่ะ`);
          setStatusMessage(`ผู้ใช้ "${participant.identity}" เข้าร่วมแล้วค่ะ`);

          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track;
              console.log('track', track)
              if (remoteVideoRef.current) {
                remoteVideoRef.current.appendChild(track.attach());
              }
            }
          });

          participant.on('trackSubscribed', track => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.appendChild(track.attach());
            }
          });
        });

        // 4. จัดการเหตุการณ์เมื่อผู้เข้าร่วมออก
        room.on('participantDisconnected', participant => {
          console.log(`ผู้ใช้ "${participant.identity}" ออกจากห้องค่ะ`);
          setStatusMessage(`ผู้ใช้ "${participant.identity}" ออกจากห้องแล้วค่ะ`);
          participant.tracks.forEach(publication => {
            if (publication.track) {
              const attachedElements = publication.track.detach();
              attachedElements.forEach(element => element.remove());
            }
          });
        });

        // 5. จัดการเมื่อเราออกจากห้อง
        room.on('disconnected', (room, error) => {
          console.log('ออกจากห้องแล้วค่ะ', error);
          if (error) {
            console.error('Room disconnect error:', error);
            setStatusMessage(`ตัดการเชื่อมต่อ: ${error.message}`);
          } else {
            setStatusMessage('ตัดการเชื่อมต่อแล้วค่ะ');
          }

          localTracksRef.current.forEach(track => {
            track.stop();
            track.detach().forEach(element => element.remove());
          });

          if (remoteVideoRef.current) {
            Array.from(remoteVideoRef.current.children).forEach(child => child.remove());
          }
          setActiveRoom(null);
        });

      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ Twilio Video:', error);
        setStatusMessage(`เกิดข้อผิดพลาด: ${error.message}`);
      }
    };

    // เริ่มการเชื่อมต่อเมื่อ twilioToken พร้อมใช้งานเท่านั้น
    connectToRoom();

    // Cleanup function: เมื่อคอมโพเนนต์ถูก unmount
    return () => {
      isMounted = false;
      if (currentRoom) {
        console.log('Cleaning up active Twilio room...');
        currentRoom.disconnect();
      }
    };
  }, [twilioToken, roomId, appointmentData]);

  const onToggleMic = () => {
    const audioTrack = localTracksRef.current.find(track => track.kind === 'audio');
    if (audioTrack) {
      if (audioTrack.isEnabled) {
        audioTrack.disable();
        setIsMicMuted(true);
        setStatusMessage('ปิดไมค์แล้วค่ะ');
      } else {
        audioTrack.enable();
        setIsMicMuted(false);
        setStatusMessage('เปิดไมค์แล้วค่ะ');
      }
    } else {
      console.warn('Audio track not found.');
    }
  };

  const onToggleCamera = () => {
    const videoTrack = localTracksRef.current.find(track => track.kind === 'video');
    if (videoTrack) {
      if (videoTrack.isEnabled) {
        videoTrack.disable();
        setIsCameraOff(true);
        setStatusMessage('ปิดกล้องแล้วค่ะ');
      } else {
        videoTrack.enable();
        setIsCameraOff(false);
        setStatusMessage('เปิดกล้องแล้วค่ะ');
      }
    } else {
      console.warn('Video track not found.');
    }
  };

  const onEndCall = () => {
    if (activeRoom) {
      activeRoom.disconnect();
      navigate('/')
    }
  };


  return (
    <div className="flex flex-col items-center p-4">
      {/* <h1 className="text-2xl font-bold mb-4">การโทรด้วยวีดีโอ</h1> */}
      <p className="text-sm text-gray-600 mb-4">{statusMessage}</p>
      <div className="flex flex-col relative md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
        {/* Local Video Stream */}
        <div className="absolute z-10 right-0 bottom-4 w-1/3 h-1/3 bg-black rounded-lg overflow-hidden shadow-lg aspect-video">
          <div ref={localVideoRef} className="absolute inset-0 z-20 w-full h-full"></div>
          <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 px-2 rounded-md z-20">คุณ</span>
        </div>
        {/* Remote Video Stream */}
        <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg aspect-video">
          <div ref={remoteVideoRef} className="absolute inset-0 z-20 w-full h-full"></div>
          <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 px-2 rounded-md z-20">คู่สนทนา</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center p-4 space-x-4 mt-4 ">
        <button
          onClick={onToggleCamera}
          className={`p-3 rounded-full shadow-md transition duration-150 cursor-pointer ${isCameraOff ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
          aria-label={isCameraOff ? 'เปิดกล้อง' : 'ปิดกล้อง'}
          disabled={!activeRoom}
        >
          {isCameraOff ? <VideoOff /> : <Video />}
        </button>

        <button
          onClick={onEndCall}
          className="p-3 bg-red-500 text-white cursor-pointer rounded-full shadow-md hover:bg-red-600 transition duration-150"
          aria-label="วางสาย"
          disabled={!activeRoom}
        >
          <Phone />
        </button>

        <button
          onClick={onToggleMic}
          className={`p-3 rounded-full shadow-md cursor-pointer transition duration-150 ${isMicMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
          aria-label={isMicMuted ? 'เปิดไมค์' : 'ปิดไมค์'}
          disabled={!activeRoom}
        >
          {isMicMuted ? <MicOff /> : <Mic />}
        </button>
      </div>

    </div>
  );
};

export default VideoCallTwilio;



