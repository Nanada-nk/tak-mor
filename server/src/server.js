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

    // --- Event: Client เข้าร่วมห้อง Chat (Join Chat Room) ---
    socket.on('joinChatRoom', (payload) => {
        const { roomId, userId, userName } = payload;
        console.log(`User ${userName || userId} (${socket.id}) joining chat room: ${roomId}.`);
        socket.join(roomId);
        console.log(`Socket.IO: User ${userId} (${socket.id}) joined chat room: ${roomId}`);
    });

    // socket.on('joinRoom', (payload) => {
    //     const { roomId, userId, userName } = payload;
    //     console.log(`[VideoCall] joinRoom: userId=${userId}, roomId=${roomId}, socketId=${socket.id}`);
    //     socket.join(roomId);

    //     if (!rooms[roomId]) rooms[roomId] = {};
    //     rooms[roomId][userId] = { socketId: socket.id, userName };
    //     socketToUserMap[socket.id] = { roomId, userId };

    //     socket.to(roomId).emit('user-joined', { userId, userName });
    // });

    // // --- Event: Client ส่งสัญญาณ WebRTC (SDP/ICE Candidate) ---
    // socket.on('sending signal', (payload) => {
    //     const { userToSignal, callerID, signal } = payload;
    //     console.log(`Relaying signal from ${callerID} to ${userToSignal}.`);

    //     const targetRoomId = socketToUserMap[socket.id]?.roomId;
    //     if (targetRoomId && rooms[targetRoomId] && rooms[targetRoomId][userToSignal]) {
    //         const targetSocketId = rooms[targetRoomId][userToSignal].socketId;
    //         socket.to(targetSocketId).emit('receiving signal', { signal: signal, callerID: callerID });
    //     } else {
    //         console.warn(`Target user ${userToSignal} not found in room ${targetRoomId} for signaling.`);
    //     }
    // });

    // // --- Event: Client เปลี่ยนสถานะไมค์ ---
    // socket.on('toggleMic', (payload) => {
    //     const { roomId, userId, isMuted } = payload;
    //     console.log(`User ${userId} in room ${roomId} toggled mic to ${isMuted}.`);
    //     socket.to(roomId).emit('toggleMicStatus', { userId: userId, isMuted: isMuted });
    // });

    // // --- Event: Client เปลี่ยนสถานะกล้อง (สำหรับ Video Call) ---
    // socket.on('toggleCamera', (payload) => {
    //     const { roomId, userId, isCameraOff } = payload;
    //     console.log(`User ${userId} in room ${roomId} toggled camera to ${isCameraOff}.`);
    //     socket.to(roomId).emit('toggleCameraStatus', { userId: userId, isCameraOff: isCameraOff });
    // });

    // --- Event: Client ส่งข้อความ Chat ---
    
    socket.on('chatMessage', (msg) => {
 
        console.log(`Raw chatMessage payload:`, msg); 
        const roomId = msg.roomId; 
        const messageContent = msg.message; 
        if (roomId && messageContent !== undefined) { 
            console.log(`Chat message in room ${roomId} from ${msg.senderName || msg.senderId}: ${messageContent}`);
            io.to(roomId).emit('receive_message', msg);
        } else {
            console.warn(`Invalid chat message data received. Room ID: ${roomId}, Message: ${messageContent}`, msg);
        }
    });

    // --- Event: Client ออกจากห้อง (Leave Room) ---
    socket.on('leaveChatRoom', (payload) => {
        const { roomId, userId } = payload;
        console.log(`User ${userId} leaving chat room ${roomId}.`);
        socket.leave(roomId);
    });


    // --- Event: Client ตัดการเชื่อมต่อ Socket ---
    socket.on('disconnect', () => {
        console.log('Socket.IO Disconnected:', socket.id);
        const userInfo = socketToUserMap[socket.id];
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

