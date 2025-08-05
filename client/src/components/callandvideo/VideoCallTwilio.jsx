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

   
        localTracksRef.current = tracks;

        tracks.forEach(track => {
          const trackElement = track.attach();
          if (localVideoRef.current) {
            localVideoRef.current.appendChild(trackElement);
          }
          console.log('trackElement', trackElement)
        });

       
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

    
    connectToRoom();

    
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
      
      <p className="text-sm text-gray-600 mb-4">{statusMessage}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       
        <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg aspect-video">
          <div ref={localVideoRef} className="relative w-full h-full"></div>
          <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 px-2 rounded-md z-20">คุณ</span>
        </div>
        
        <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg aspect-video">
          <div ref={remoteVideoRef} className="relative w-full h-full"></div>
          <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 px-2 rounded-md z-20">คู่สนทนา</span>
        </div>
      </div>

    
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



