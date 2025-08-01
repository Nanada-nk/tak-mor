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
      // query: { appointmentId: appointmentId, userId: currentUser.id, userName: currentUser.firstName || currentUser.email },
    });

    socketRef.current.on('connect', () => {
      console.log('Chat Socket connected! ID:', socketRef.current.id);
      socketRef.current.emit('joinChatRoom', { roomId: appointmentId, userId: currentUser.id });
    });

    socketRef.current.on('receive_message', (message) => {
      console.log('Received real-time message:', message);
      if (message.roomId === appointmentId || message.appointmentId === parseInt(appointmentId)) {
        addChatMessage(message); // เพิ่มข้อความลง teleStore
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
      senderName: currentUser.firstName || currentUser.email, // เพิ่ม senderName
      // TODO: ถ้าต้องการ receiverId ใน Frontend ต้องหาจาก participants หรือ API อื่น
      receiverId: currentUser.role === 'PATIENT' ? 0 : 0, // Placeholder
      message: newMessageContent.trim(),
      messageType: 'TEXT',
      timestamp: new Date().toISOString(), // ส่ง timestamp จาก Frontend
      isRead: false,
    };

    try {
      // *** ส่งข้อความผ่าน Socket.IO โดยตรง ไม่เรียก API เพื่อบันทึกลง DB ***
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit('chatMessage', messageData); // Emit 'chatMessage' event
        // addChatMessage(messageData); // อัปเดต UI ของผู้ส่งทันที
        setNewMessageContent('');
      } else {
        setLocalError("Socket not connected. Cannot send message.");
      }
    } catch (err) {
      console.error("Failed to send message via socket:", err);
      setLocalError("Failed to send message.");
    }
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
    <div className="flex flex-col h-[900px] font-prompt bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white p-4 shadow-sm border-b border-gray-200">
        <h2 className="font-bold text-lg">Chat with {currentUser.role === 'PATIENT' ? 'DOCTOR' : 'PATIENT'}</h2>
        <p className="text-sm text-gray-500">Appointment ID: {appointmentId}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No messages yet. Start a conversation!</div>
        ) : (
          chatMessages.map((msg, index) => (
            <div
              key={msg.id || index} // ใช้ index เป็น fallback key ถ้า msg.id ไม่มี
              className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${msg.senderId === currentUser.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
                  }`}
              >
                <p className="font-semibold text-xs mb-1">
                  {msg.senderId === currentUser.id ? 'You' : msg.senderName || 'Unknown User'} {/* ใช้ msg.senderName */}
                </p>
                <p>{msg.message}</p>
                <span className="block text-right text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-full px-4 py-2"
            disabled={!newMessageContent.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;