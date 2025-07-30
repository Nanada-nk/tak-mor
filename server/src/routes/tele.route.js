import express from 'express'
import authenticateUser from '../middlewares/authenticate.middleware.js';
import teleController from '../controllers/tele.controller.js';

const teleRouter = express.Router()

// // --- Chat Message Routes ---
// // Endpoint สำหรับส่งข้อความแชทใหม่
// teleRouter.post('/chat/messages', authenticateUser, teleController.sendChatMessage);

// // Endpoint สำหรับดึงข้อความแชททั้งหมดของการนัดหมายที่ระบุ
// teleRouter.get('/chat/appointments/:appointmentId/messages', authenticateUser, teleController.getChatMessagesByAppointment);

// // Endpoint สำหรับตั้งค่าข้อความเป็นอ่านแล้ว
// teleRouter.put('/chat/messages/:messageId/read', authenticateUser, teleController.markChatMessageAsRead);


// // --- Call Log Routes ---
// // Endpoint สำหรับบันทึกข้อมูลการโทร/วิดีโอคอล (เริ่มต้นหรือสิ้นสุด)
// teleRouter.post('/calls/logs', authenticateUser, teleController.logCall);

// // Endpoint สำหรับอัปเดตสถานะหรือรายละเอียดของ Call Log ที่มีอยู่
// teleRouter.put('/calls/logs/:id', authenticateUser, teleController.updateCallLog);

// // Endpoint สำหรับดึง Call Log ทั้งหมดของการนัดหมายที่ระบุ
// teleRouter.get('/calls/appointments/:appointmentId/logs', authenticateUser, teleController.getCallLogsByAppointment);


// // --- Notification Routes ---
// // Endpoint สำหรับดึงการแจ้งเตือนทั้งหมดสำหรับผู้ใช้ที่ระบุ
// // ข้อสังเกต: หากคุณครูต้องการให้ API นี้ดึง notifications ของผู้ใช้ที่ล็อกอินอยู่เสมอ (req.user.id)
// // โดยไม่ต้องระบุ :userId ใน URL หรือต้องการให้ Admin เข้าถึงได้
// // อาจพิจารณาเปลี่ยน Endpoint เป็น '/notifications/me' หรือ '/notifications' แล้วจัดการ logic ใน Controller
// // แต่ตามโครงสร้างปัจจุบันที่ใช้ :userId ก็สามารถใช้งานได้ถ้ามี authorization logic รองรับ
// teleRouter.get('/notifications/users/:userId', authenticateUser, teleController.getNotificationsByUser);

// // Endpoint สำหรับตั้งค่าการแจ้งเตือนเป็นอ่านแล้ว
// teleRouter.put('/notifications/:notificationId/read', authenticateUser, teleController.markNotificationAsRead);

// // Endpoint สำหรับลบการแจ้งเตือน
// teleRouter.delete('/notifications/:notificationId', authenticateUser, teleController.deleteNotification);


export default teleRouter