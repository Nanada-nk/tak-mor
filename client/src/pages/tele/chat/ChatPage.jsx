import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import authStore from '../../../stores/authStore.js';
import teleStore from '../../../stores/teleStore.js';
import { io } from 'socket.io-client';

function ChatPage() {
  const { appointmentId } = useParams();
  const currentUser = authStore((state) => state.user);

  const chatMessages = teleStore((state) => state.chatMessages);
  const setChatMessages = teleStore((state) => state.setChatMessages);
  const addChatMessage = teleStore((state) => state.addChatMessage);
  const setError = teleStore((state) => state.setError);
  const clearTeleState = teleStore((state) => state.clearTeleState);

  const [newMessageContent, setNewMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!appointmentId || !currentUser) {
      setLoading(false);
      setLocalError("Missing appointment ID or user information.");
      return;
    }

    setChatMessages([]);
    setLoading(false);

    // --- Socket.IO Setup for Chat ---
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('Chat Socket connected! ID:', socketRef.current.id);
      socketRef.current.emit('joinChatRoom', { roomId: appointmentId, userId: currentUser.id });
    });

    socketRef.current.on('receive_message', (message) => {
      console.log('Received real-time message:', message);
      // *** จุดที่แก้ไข ***
      // ตรวจสอบว่าข้อความที่ได้รับไม่ใช่ข้อความที่เราส่งไปเอง
      if (message.senderId !== currentUser.id) {
        if (message.roomId === appointmentId || message.appointmentId === parseInt(appointmentId)) {
          addChatMessage(message); // เพิ่มข้อความลง teleStore
        }
      }
    });

    socketRef.current.on('disconnect', () => console.log('Chat Socket disconnected!'));
    socketRef.current.on('connect_error', (err) => console.error('Chat Socket Connection Error:', err));
    socketRef.current.on('error', (err) => console.error('Chat Socket Error:', err));

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leaveChatRoom', { appointmentId: appointmentId, userId: currentUser.id });
        socketRef.current.disconnect();
      }
      clearTeleState();
    };

  }, [appointmentId, currentUser, setChatMessages, addChatMessage, setError, clearTeleState]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageContent.trim() || !currentUser || !appointmentId) return;

    const messageData = {
      roomId: appointmentId,
      senderId: currentUser.id,
      senderName: currentUser.firstName || currentUser.email,
      receiverId: currentUser.role === 'PATIENT' ? 0 : 0,
      message: newMessageContent.trim(),
      messageType: 'TEXT',
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    try {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('chatMessage', messageData);
        setNewMessageContent('');

        // *** จุดที่แก้ไข ***
        // เพิ่มข้อความลงใน state ของเราทันที เพื่อให้แสดงผลเลย (Optimistic UI)
        addChatMessage({ ...messageData, id: Date.now() }); 

      } else {
        setLocalError("Socket not connected. Cannot send message.");
      }
    } catch (err) {
      console.error("Failed to send message via socket:", err);
      setLocalError("Failed to send message.");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSendImage = () => {
    if (!selectedImage) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const messageData = {
        roomId: appointmentId,
        senderId: currentUser.id,
        senderName: currentUser.firstName || currentUser.email,
        message: reader.result,
        messageType: 'IMAGE',
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('chatMessage', messageData);
        
        // *** จุดที่แก้ไข ***
        // เพิ่มข้อความ (รูปภาพ) ลงใน chatMessages ของตัวเองทันที
        addChatMessage({ ...messageData, id: Date.now() });

        setSelectedImage(null);
        fileInputRef.current.value = '';
      } else {
        setLocalError("Socket not connected. Cannot send image.");
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  if (!currentUser) {
    return <div className="text-center py-4">Please log in to chat.</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
        <span className="loading loading-infinity loading-xl text-primary"></span>
        <p className="mt-4 text-2xl font-bold text-gray-700">Loading chat...</p>
      </div>
    )
  }

  if (localError) {
    return (
      <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-red-100 text-red-800">
        <span className="loading loading-infinity loading-xl text-error"></span>
        <h2 className="mt-4 text-2xl font-bold">Error: {localError}</h2>
      </div>
    )
  }

  
  return (
    <div className="font-prompt flex flex-col container mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-[840px] shadow-lg rounded-lg overflow-hidden bg-[#d9e6f7] my-2">
      {/* Chat Header */}
      <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex items-center gap-3">
        <h2 className="font-bold text-lg">Chat with {currentUser?.role === 'PATIENT' ? 'DOCTOR' : 'PATIENT'}</h2>
        <p className="text-sm text-gray-500">Appointment ID: {appointmentId}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 md:space-y-3 bg-[#d9e6f7]">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No messages yet. Start a conversation!</div>
        ) : (
          chatMessages.map((msg, index) => {
            const senderAvatarSrc = msg.senderProfileImageUrl || 'https://res.cloudinary.com/dhoyopcr7/image/upload/v1754248709/user-hands-svgrepo-com_puf9vw.svg';
            const currentUserAvatarSrc = currentUser?.profilePictureUrl || 'https://res.cloudinary.com/dhoyopcr7/image/upload/v1754248709/user-hands-svgrepo-com_puf9vw.svg'; 

            return (
              <div
                key={msg.id || index}
                className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'} items-end`}
              >
                {msg.senderId !== currentUser?.id && ( 
                  <img
                    src={senderAvatarSrc}
                    alt={`${msg.senderName || 'User'} Avatar`}
                    className="w-10 h-10 rounded-full mr-2 bg-white p-1 shadow-md"
                  />
                )}

                <div
                  className={`max-w-xs px-3 py-2 rounded-lg shadow-xl break-words ${msg.senderId === currentUser?.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="font-semibold text-xs mb-1">
                    {msg.senderId === currentUser?.id ? 'You' : msg.senderName || 'Unknown User'}
                  </p>
                  {msg.messageType === 'IMAGE' ? (
                    <img 
                      src={msg.message}
                      alt="Uploaded" 
                      className="w-full h-auto max-w-[200px] rounded-md cursor-pointer" 
                      onClick={() => window.open(msg.message, '_blank')}
                    />
                  ) : (
                    <p className="text-sm">{msg.message}</p>
                  )}
                  <span className="block text-right text-xs opacity-70 mt-0.5">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {msg.senderId === currentUser?.id && ( 
                  <img
                    src={currentUserAvatarSrc}
                    alt="Your Avatar"
                    className="w-10 h-10 rounded-full ml-2 bg-white p-1 shadow-md"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex flex-col gap-2">
          {selectedImage && (
            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
              <img 
                src={URL.createObjectURL(selectedImage)} 
                alt="Preview" 
                className="w-12 h-12 object-cover rounded-md" 
              />
              <p className="flex-1 text-sm text-gray-700">{selectedImage.name}</p>
              <button 
                onClick={() => {
                  setSelectedImage(null); 
                  fileInputRef.current.value = '';
                }}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <label htmlFor="image-upload" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </label>
            <input 
              type="file" 
              id="image-upload" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageSelect}
              ref={fileInputRef}
            />

            <input
              type="text"
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-blue-50 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              disabled={selectedImage}
            />
            
            {selectedImage ? (
              <button
                type="button"
                onClick={handleSendImage}
                className="btn btn-primary rounded-full px-7 py-2 text-sm"
              >
                Send Image
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary rounded-full px-7 py-2 text-sm"
                disabled={!newMessageContent.trim()}
              >
                Send
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;