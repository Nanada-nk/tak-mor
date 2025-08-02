import express from 'express'
import teleController from '../controllers/tele.controller.js';


const teleRouter = express.Router()

// --- Chat Message Routes ---
teleRouter.post('/chat/messages', teleController.sendChatMessage);
teleRouter.get('/chat/appointments/:appointmentId/messages', teleController.getChatMessagesByAppointment);
teleRouter.put('/chat/messages/:messageId/read', teleController.markChatMessageAsRead);


// --- Call Log Routes ---
teleRouter.post('/calls/logs', teleController.logCall);
teleRouter.put('/calls/logs/:id', teleController.updateCallLog);
teleRouter.get('/calls/appointments/:appointmentId/logs', teleController.getCallLogsByAppointment);


// --- Notification Routes ---
teleRouter.get('/notifications/users/:userId', teleController.getNotificationsByUser);
teleRouter.put('/notifications/:notificationId/read', teleController.markNotificationAsRead);
teleRouter.delete('/notifications/:notificationId', teleController.deleteNotification);


// --- twilio /api/tele/token ---
teleRouter.post('/token/video', teleController.generateTwilioVideoToken)
teleRouter.post('/token/voice', teleController.generateTwilioVoiceToken)
teleRouter.post('/voice', teleController.handleVoiceTwiML);

export default teleRouter