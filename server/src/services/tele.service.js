import prisma from "../config/prisma.config.js"
import createError from "../utils/create-error.js"

const teleService = {}

// teleService.createChatMessage = async (messageData) => {
//   const { appointmentId, senderId, receiverId, messageContent, messageType, mediaUrl } = messageData;

//   const appointment = await prisma.appointment.findUnique({
//     where: { id: parseInt(appointmentId) },
//     select: { patientId: true, doctorId: true }
//   });

//   if (!appointment) {
//     throw createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id');
//   }

//   if (senderId !== appointment.patientId && senderId !== appointment.doctorId) {
//     throw createError(403, 'Forbidden: Sender is not part of this appointment.', 'authorization');
//   }

//   const newMessage = await prisma.chatMessage.create({
//     data: {
//       appointmentId: parseInt(appointmentId),
//       senderId: parseInt(senderId),
//       receiverId: receiverId ? parseInt(receiverId) : null,
//       messageContent,
//       messageType: messageType || 'TEXT',
//       mediaUrl: mediaUrl || null,
//       isRead: false
//     }
//   });
//   return newMessage;
// }

// teleService.getMessagesByAppointment = async (appointmentId) => {
//   const messages = await prisma.chatMessage.findMany({
//     where: { appointmentId: parseInt(appointmentId) },
//     orderBy: { timestamp: 'asc' },
//     include: {
//       Sender: { select: { id: true, firstName: true, lastName: true } },
//       Receiver: { select: { id: true, firstName: true, lastName: true } }
//     }
//   })
//   return messages
// }

// teleService.setChatMessageRead = async (messageId, userId) => {
//   const message = await prisma.chatMessage.findUnique({
//     where: { id: parseInt(messageId) },
//     select: { receiverId: true }
//   })
//   if (!message) {
//     throw createError(404, `Chat message with ID ${messageId} not found.`, 'message_id');
//   }

//   if (message.receiverId !== userId) {
//     throw createError(403, 'Forbidden: You are not authorized to mark this message as read.', 'authorization');
//   }

//   const updatedMessage = await prisma.chatMessage.update({
//     where: { id: parseInt(messageId) },
//     data: { isRead: true }
//   })
//   return updatedMessage
// }

// teleService.createCallLog = async (callData) => {
//   const { appointmentId, callerId, receiverId, callType, startTime, endTime, durationMinutes, status, webRTCSessionId } = callData

//   const appointment = await prisma.appointment.findUnique({
//     where: { id: parseInt(appointmentId) },
//     select: { patientId: true, doctorId: true }
//   })

//   if (!appointment) {
//     throw createError(404, `Appointment with ID ${appointmentId} not found.`);
//   }

//   if ((callerId !== appointment.patientId && callerId !== appointment.doctorId) ||
//     (receiverId !== appointment.patientId && receiverId !== appointment.doctorId)) {
//     throw createError(403, 'Forbidden: Caller or receiver is not part of this appointment.', 'authorization');
//   }

//   const newCallLog = await prisma.callLog.create({
//     data: {
//       appointmentId: parseInt(appointmentId),
//       callerId: parseInt(callerId),
//       receiverId: parseInt(receiverId),
//       callType,
//       startTime: new Date(startTime),
//       endTime: endTime ? new Date(endTime) : null,
//       durationMinutes: durationMinutes ? parseInt(durationMinutes) : null,
//       status: status || 'COMPLETED',
//       webRTCSessionId: webRTCSessionId ? parseInt(webRTCSessionId) : null
//     }
//   })
//   return newCallLog
// }

// teleService.updateExistingCallLog = async (callLogId, updateData, userId) => {
//   const existingCallLog = await prisma.callLog.findUnique({
//     where: { id: parseInt(callLogId) },
//     select: { callerId: true, receiverId: true }
//   })

//   if (!existingCallLog) {
//     throw createError(404, `Call Log with ID ${callLogId} not found.`);
//   }

//   if (userId !== existingCallLog.callerId && userId !== existingCallLog.receiverId) {
//     throw createError(403, 'Forbidden: You are not authorized to update this call log.', 'authorization');
//   }

//   const updatedCallLog = await prisma.callLog.update({
//     where: { id: parseInt(callLogId) },
//     data: {
//       endTime: updateData.endTime ? new Date(updateData.endTime) : undefined,
//       durationMinutes: updateData.durationMinutes ? parseInt(updateData.durationMinutes) : undefined,
//       status: updateData.status || undefined,
//     }
//   })
//   return updatedCallLog
// }

// teleService.getCallLogsByAppointmentId = async (appointmentId) => {
//   const callLogs = await prisma.callLog.findMany({
//     where: { appointmentId: parseInt(appointmentId) },
//     orderBy: { startTime: 'asc' },
//     include: {
//       Caller: { select: { id: true, firstName: true, lastName: true } },
//       Receiver: { select: { id: true, firstName: true, lastName: true } }
//     }
//   })
//   return callLogs
// }


// teleService.getNotificationsByUserId = async (userId) => {
//   const notifications = await prisma.notification.findMany({
//     where: { userId: parseInt(userId) },
//     orderBy: { createdAt: 'desc' }
//   })
//   return notifications
// }

// teleService.setNotificationRead = async (notificationId, userId) => {
//   const notification = await prisma.notification.findUnique({
//     where: { id: parseInt(notificationId) },
//     select: { userId: true }
//   })

//   if (!notification) {
//     throw createError(404, `Notification with ID ${notificationId} not found.`);
//   }

//   if (notification.userId !== userId) {
//     throw createError(403, 'Forbidden: You are not authorized to mark this notification as read.', 'authorization');
//   }

//   const updatedNotification = await prisma.notification.update({
//     where: { id: parseInt(notificationId) },
//     data: { isRead: true }
//   })
//   return updatedNotification
// }

// teleService.deleteExistingNotification = async (notificationId, userId) => {
//   const notification = await prisma.notification.findUnique({
//     where: { id: parseInt(notificationId) },
//     select: { userId: true }
//   })

//   if (!notification) {
//     throw createError(404, `Notification with ID ${notificationId} not found.`, 'notification_id');
//   }

//   if (notification.userId !== userId && userRole !== 'ADMIN') {
//     throw createError(403, 'Forbidden: You are not authorized to delete this notification.', 'authorization');
//   }

//   await prisma.notification.delete({
//     where: { id: parseInt(notificationId) }
//   })
// }

export default teleService