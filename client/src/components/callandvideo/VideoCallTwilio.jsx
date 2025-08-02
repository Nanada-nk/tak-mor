import { useEffect, useRef, useState } from 'react';
import { connect, createLocalTracks } from 'twilio-video';

const VideoCallTwilio = ({ roomId, appointmentData, twilioToken }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [statusMessage, setStatusMessage] = useState('กำลังเชื่อมต่อ...');
  const [activeRoom, setActiveRoom] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);

  useEffect(() => {
    console.log('useEffect VideoCallTwilio')
    const connectToRoom = async () => {
      try {
        // 1. สร้าง Local Tracks (กล้องและไมโครโฟน)
        setStatusMessage('กำลังเข้าถึงกล้องและไมโครโฟน...');
        const tracks = await createLocalTracks({
          audio: true,
          video: { width: 640 }
        });
        console.log('tracks', tracks)
        setLocalTracks(tracks);

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

        setActiveRoom(room);
        setStatusMessage(`เชื่อมต่อสำเร็จแล้วค่ะ! ห้อง: ${room.name}`);
        console.log(`เข้าร่วม Room ได้สำเร็จ: ${room.name}`);

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
          setStatusMessage('ตัดการเชื่อมต่อแล้วค่ะ');
          localTracks.forEach(track => {
            track.stop();
            track.detach().forEach(element => element.remove());
          });
        });

      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ Twilio Video:', error);
        setStatusMessage(`เกิดข้อผิดพลาด: ${error.message}`);
      }
    };

    // เริ่มการเชื่อมต่อเมื่อ twilioToken พร้อมใช้งานเท่านั้น
    if (twilioToken) {
      connectToRoom();
    }

    // Cleanup function: เมื่อคอมโพเนนต์ถูก unmount
    return () => {
      if (activeRoom) {
        console.log('Cleaning up active Twilio room...');
        activeRoom.disconnect();
      }
      localTracks.forEach(track => {
        track.stop();
        track.detach().forEach(element => element.remove());
      });
    };
  }, [twilioToken, roomId, appointmentData]);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">การโทรด้วยวีดีโอ</h1>
      <p className="text-sm text-gray-600 mb-4">{statusMessage}</p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
        {/* Local Video Stream */}
        <div className="relative w-full md:w-1/2 bg-black rounded-lg overflow-hidden shadow-lg aspect-video">
          <div ref={localVideoRef} className="absolute inset-0 z-10 w-full h-full"></div>
          <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 px-2 rounded-md z-20">คุณ</span>
        </div>
        {/* Remote Video Stream */}
        <div className="relative w-full md:w-1/2 bg-gray-800 rounded-lg overflow-hidden shadow-lg aspect-video">
          <div ref={remoteVideoRef} className="absolute inset-0 z-10 w-full h-full"></div>
          <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-1 px-2 rounded-md z-20">คู่สนทนา</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCallTwilio;