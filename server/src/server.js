
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


import { app, httpServer } from "./app.js";


import shutdownUtil from './utils/shutdown.util.js';
import { Server as SocketIOServer } from 'socket.io';


const PORT = process.env.PORT || 8000;


const io = new SocketIOServer(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});


const rooms = {};
const socketToUserMap = {};


io.on('connection', (socket) => {
    console.log(`Socket.IO Connected: ${socket.id}`);

    socket.emit('welcome', 'Welcome to the Tak-Mor Socket.IO server!');

    
    socket.on('joinChatRoom', (payload) => {
        const { roomId, userId, userName } = payload;
        console.log(`User ${userName || userId} (${socket.id}) joining chat room: ${roomId}.`);
        socket.join(roomId);
        console.log(`Socket.IO: User ${userId} (${socket.id}) joined chat room: ${roomId}`);
    });

  
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

 
    socket.on('leaveChatRoom', (payload) => {
        const { roomId, userId } = payload;
        console.log(`User ${userId} leaving chat room ${roomId}.`);
        socket.leave(roomId);
    });


    
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


httpServer.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`Node Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('Environment Variables loaded successfully.');
    console.log(`Socket.IO is listening on port ${PORT}`);
});


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


export { httpServer, io };

