import express from 'express'
import authenticateUser from '../middlewares/authenticate.middleware.js';

const teleRouter = express.Router()

// // --- Chat Message Routes ---
// // Endpoint สำหรับส่งข้อความแชทใหม่
// teleRouter.post('/chat/messages', authenticateUser, sendChatMessage);

// // Endpoint สำหรับดึงข้อความแชททั้งหมดของการนัดหมายที่ระบุ
// teleRouter.get('/chat/appointments/:appointmentId/messages', authenticateUser, getChatMessagesByAppointment);

// // Endpoint สำหรับตั้งค่าข้อความเป็นอ่านแล้ว
// teleRouter.put('/chat/messages/:messageId/read', authenticateUser, markChatMessageAsRead);


// // --- Call Log Routes ---
// // Endpoint สำหรับบันทึกข้อมูลการโทร/วิดีโอคอล (เริ่มต้นหรือสิ้นสุด)
// teleRouter.post('/calls/logs', authenticateUser, logCall);

// // Endpoint สำหรับอัปเดตสถานะหรือรายละเอียดของ Call Log ที่มีอยู่
// teleRouter.put('/calls/logs/:id', authenticateUser, updateCallLog);

// // Endpoint สำหรับดึง Call Log ทั้งหมดของการนัดหมายที่ระบุ
// teleRouter.get('/calls/appointments/:appointmentId/logs', authenticateUser, getCallLogsByAppointment);


// // --- Notification Routes ---
// // Endpoint สำหรับดึงการแจ้งเตือนทั้งหมดสำหรับผู้ใช้ที่ระบุ
// teleRouter.get('/notifications/users/:userId', authenticateUser, getNotificationsByUser);

// // Endpoint สำหรับตั้งค่าการแจ้งเตือนเป็นอ่านแล้ว
// teleRouter.put('/notifications/:notificationId/read', authenticateUser, markNotificationAsRead);

// // Endpoint สำหรับลบการแจ้งเตือน
// teleRouter.delete('/notifications/:notificationId', authenticateUser, deleteNotification);



export default teleRouter