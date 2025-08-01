// --- 1. Load Environment Variables (ต้องเป็นบรรทัดแรกสุดของ Process) ---
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// --- 2. Import HTTP Server Instance และ App จาก app.js ---
import { app, httpServer } from "./app.js";

// --- 3. Import Utilities ---
import shutdownUtil from './utils/shutdown.util.js';
import { Server as SocketIOServer } from 'socket.io';

// --- 4. กำหนด PORT ---
const PORT = process.env.PORT || 8000;

// --- 5. ตั้งค่า Socket.IO Server ---
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// --- 6. Global State สำหรับ Socket.IO Rooms (สำหรับ 1:1 Calling) ---
const rooms = {};
const socketToUserMap = {};

// --- 7. Socket.IO Connection Handling ---
io.on('connection', (socket) => {
    console.log(`Socket.IO Connected: ${socket.id}`);

    socket.emit('welcome', 'Welcome to the Tak-Mor Socket.IO server!');

    // --- Event: Client เข้าร่วมห้อง (Join Room) ---
    // *** แก้ไขตรงนี้: เปลี่ยน 'joinRoom' เป็น 'joinChatRoom' ให้ตรงกับ Frontend ***
    socket.on('joinChatRoom', (payload) => {
        const { roomId, userId, userName } = payload; // Frontend ส่งแค่ roomId, userId มา
        // คุณครูอาจจะส่ง userName มาจาก Frontend ใน payload นี้ด้วยก็ได้ ถ้าต้องการ log
        // หรือดึง userName จากข้อมูลผู้ใช้ที่เชื่อมต่ออยู่
        console.log(`User ${userName || userId} (${socket.id}) joining chat room: ${roomId}.`); // ปรับ log นิดหน่อย

        // Logic การจัดการห้องใน Backend ของคุณครู (rooms, socketToUserMap)
        // ถ้า rooms ใช้สำหรับ Video Call (1:1) เท่านั้น และ Chat Room ไม่ได้ใช้ rooms เดียวกัน
        // อาจจะต้องแยก logic การ join chat room กับ video call room ออกจากกันนะคะ
        // แต่ถ้า roomId ใน chatMessage ก็ใช้ key appointmentId เหมือนกัน
        // อาจจะต้องพิจารณาโครงสร้าง data ของ rooms ว่าเก็บอะไรบ้าง
        // สำหรับตอนนี้ ถ้าแค่ Chat อย่างเดียว ไม่ได้มี WebRTC signaling ใน Chat Room
        // อาจจะใช้แค่ socket.join(roomId) ก็พอ
        socket.join(roomId);
        console.log(`Socket.IO: User ${userId} (${socket.id}) joined chat room: ${roomId}`);

        // (Optional) ส่งข้อความต้อนรับเข้าห้องแชท
        // io.to(roomId).emit('receive_message', { senderId: 'System', senderName: 'System', message: `User ${userName || userId} has joined the chat.`, timestamp: new Date().toISOString() });
    });


    // --- Event: Client ส่งสัญญาณ WebRTC (SDP/ICE Candidate) ---
    socket.on('sending signal', (payload) => {
        const { userToSignal, callerID, signal } = payload;
        console.log(`Relaying signal from ${callerID} to ${userToSignal}.`);

        const targetRoomId = socketToUserMap[socket.id]?.roomId;
        if (targetRoomId && rooms[targetRoomId] && rooms[targetRoomId][userToSignal]) {
            const targetSocketId = rooms[targetRoomId][userToSignal].socketId;
            socket.to(targetSocketId).emit('receiving signal', { signal: signal, callerID: callerID });
        } else {
            console.warn(`Target user ${userToSignal} not found in room ${targetRoomId} for signaling.`);
        }
    });

    // --- Event: Client เปลี่ยนสถานะไมค์ ---
    socket.on('toggleMic', (payload) => {
        const { roomId, userId, isMuted } = payload;
        console.log(`User ${userId} in room ${roomId} toggled mic to ${isMuted}.`);
        socket.to(roomId).emit('toggleMicStatus', { userId: userId, isMuted: isMuted });
    });

    // --- Event: Client เปลี่ยนสถานะกล้อง (สำหรับ Video Call) ---
    socket.on('toggleCamera', (payload) => {
        const { roomId, userId, isCameraOff } = payload;
        console.log(`User ${userId} in room ${roomId} toggled camera to ${isCameraOff}.`);
        socket.to(roomId).emit('toggleCameraStatus', { userId: userId, isCameraOff: isCameraOff });
    });

    // --- Event: Client ส่งข้อความ Chat ---
    socket.on('chatMessage', (msg) => {
        // แก้ไขตรงนี้: msg ควรมี roomId และ message อยู่แล้วจาก Frontend
        // msg: { roomId, senderId, senderName, message, messageType, timestamp, isRead }
        console.log(`Raw chatMessage payload:`, msg); // <-- เพิ่มบรรทัดนี้เพื่อ debug

        const roomId = msg.roomId; // ดึง roomId จาก payload
        const messageContent = msg.message; // ดึง message จาก payload

        if (roomId && messageContent !== undefined) { // ตรวจสอบว่า roomId ไม่ว่างและ message มีค่า
            console.log(`Chat message in room ${roomId} from ${msg.senderName || msg.senderId}: ${messageContent}`);
            // ส่งข้อความกลับไปหา Client ทุกคนในห้องที่เกี่ยวข้องกับ roomId นี้
            io.to(roomId).emit('receive_message', msg); // Broadcast to all in the chat room
        } else {
            console.warn(`Invalid chat message data received. Room ID: ${roomId}, Message: ${messageContent}`, msg);
        }
    });

    // --- Event: Client ออกจากห้อง (Leave Room) ---
    // *** ถ้ามี leaveChatRoom ใน Frontend ต้องเพิ่มตรงนี้ด้วย ***
    socket.on('leaveChatRoom', (payload) => {
        const { roomId, userId } = payload;
        console.log(`User ${userId} leaving chat room ${roomId}.`);
        socket.leave(roomId);
        // (Optional) logic ลบผู้ใช้ออกจาก state ของ rooms ถ้าจำเป็น
    });


    // --- Event: Client ตัดการเชื่อมต่อ Socket ---
    socket.on('disconnect', () => {
        console.log('Socket.IO Disconnected:', socket.id);
        const userInfo = socketToUserMap[socket.id]; // ตรวจสอบเฉพาะที่เกี่ยวข้องกับ 1:1 calling room
        if (userInfo) {
            const { roomId, userId } = userInfo;
            if (rooms[roomId] && rooms[roomId][userId]) {
                delete rooms[roomId][userId];
                if (Object.keys(rooms[roomId]).length === 0) {
                    delete rooms[roomId];
                }
            }
            delete socketToUserMap[socket.id];
            socket.to(roomId).emit('user-left', userId);
            console.log(`User ${userId} (${socket.id}) left room ${roomId} due to disconnect.`);
        }
        // ถ้ามี logic สำหรับ chat rooms ที่ไม่เกี่ยวข้องกับ socketToUserMap
        // ก็ต้องจัดการตรงนี้ด้วย (เช่น ลบข้อมูลผู้ใช้ออกจาก chat room)
    });
});

// --- 8. Start the HTTP Server ---
httpServer.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`Node Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('Environment Variables loaded successfully.');
    console.log(`Socket.IO is listening on port ${PORT}`);
});

// --- 9. Global Unhandled Error Handling (สำคัญมากสำหรับ Production) ---
process.on("SIGINT", () => shutdownUtil("SIGINT"));
process.on("SIGTERM", () => shutdownUtil("SIGTERM"));

process.on("unhandledRejection", (reason, promise) => {
    console.error('Unhandled Rejection detected:', reason);
    shutdownUtil("unhandledRejection", reason);
});

process.on("uncaughtException", err => {
    console.error('Uncaught Exception detected:', err);
    shutdownUtil("uncaughtException", err);
});

// --- 10. Export Socket.IO instance (ถ้าจำเป็นต้องใช้ใน modules อื่นๆ) ---
export { httpServer, io };

