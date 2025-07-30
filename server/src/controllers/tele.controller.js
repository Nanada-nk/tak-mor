import prisma from "../config/prisma.config.js"
import teleService from "../services/tele.service.js"
import createError from "../utils/create-error.js"

const teleController = {}


// teleController.sendChatMessage = async (req, res, next) => {
//   try {
//     const { appointmentId, senderId, receiverId, messageContent, messageType, mediaUrl } = req.body
//     const userIdFromAuth = req.user.id

//     if (!appointmentId || !senderId || !messageContent) {
//       return next(createError(400, 'Missing required fields for chat message.', 'missing_fields'))
//     }

//     if (userIdFromAuth !== senderId) {
//       return next(createError(403, 'Forbidden: You cannot send messages as another user.', 'sender_id_mismatch'));
//     }

//     const newMessage = await teleService.createChatMessage({
//       appointmentId, senderId, receiverId, messageContent, messageType, mediaUrl
//     })

//     res.status(201).json({ message: 'Chat message sent successfully.', chatMessage: newMessage })
//   } catch (error) {
//     next(error)
//   }
// }

// teleController.getChatMessagesByAppointment = async (req, res, next) => {
//   try {
//     const { appointmentId } = req.params
//     const userIdFromAuth = req.user.id
//     const userRoleFromAuth = req.user.role

//     const appointment = await prisma.appointment.findUnique({
//       where: { id: parseInt(appointmentId) },
//       select: { patientId: true, doctorId: true }
//     })

//     if (!appointment) {
//       return next(createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id'));
//     }

//     const patientAccount = await prisma.patient.findUnique({
//       where: { id: appointmentId.patientId },
//       select: { accountId: true }
//     })

//     const doctorAccount = await prisma.doctor.findUnique({
//       where: { id: appointment.doctorId },
//       select: { accountId: true }
//     })

//     if (userRoleFromAuth !== 'ADMIN' &&
//       userIdFromAuth !== patientAccount?.accountId &&
//       userIdFromAuth !== doctorAccount?.accountId) {
//       return next(createError(403, 'Forbidden: You do not have access to these messages.', 'authorization'));
//     }

//     const messages = await teleService.getMessagesByAppointment(appointmentId)
//     res.status(200).json({ count: messages.length, messages })

//   } catch (error) {
//     next(error)
//   }
// }


// teleController.markChatMessageAsRead = async (req, res, next) => {
//   try {
//     const { messageId } = req.params
//     const userIdFromAuth = req.user.id
//     const updatedMessage = await teleService.setChatMessageRead(messageId, userIdFromAuth)
//     res.status(200).json({ message: 'Chat message marked as read successfully.', chatMessage: updatedMessage })
//   } catch (error) {
//     next(error)
//   }
// }


// teleController.logCall = async (req, res, next) => {
//   try {
//     const { appointmentId, callerId, receiverId, callType, startTime, endTime, durationMinutes, status, webRTCSessionId } = req.body
//     const userIdFromAuth = req.user.id

//     if (!appointmentId || !callerId || !receiverId || !callType || !startTime) {
//       return next(createError(400, 'Missing required fields for call log.', 'missing_fields'));
//     }

//     if (userIdFromAuth !== callerId && userIdFromAuth !== receiverId) {
//       return next(createError(403, 'Forbidden: You cannot log calls for other users.', 'user_id_mismatch'));
//     }

//     const newCallLog = await teleService.createCallLog({ appointmentId, callerId, receiverId, callType, startTime, endTime, durationMinutes, status, webRTCSessionId })

//     res.status(201).json({ message: 'Call log recorded successfully.', callLog: newCallLog })
//   } catch (error) {
//     next(error)
//   }
// }


// teleController.updateCallLog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
//     const userIdFromAuth = req.user.id;

//     const updatedCallLog = await teleService.updateExistingCallLog(id, updateData, userIdFromAuth)
//     res.status(200).json({ message: 'Call log updated successfully.', callLog: updatedCallLog })
//   } catch (error) {
//     next(error)
//   }
// }


// teleController.getCallLogsByAppointment = async (req, res, next) => {
//   try {

//     const { appointmentId } = req.params;
//     const userIdFromAuth = req.user.id;
//     const userRoleFromAuth = req.user.role;

//     const appointment = await prisma.appointment.findUnique({
//       where: { id: parseInt(appointmentId) },
//       select: { patientId: true, doctorId: true }
//     })

//     if (!appointment) {
//       return next(createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id'));
//     }

//     const patientAccount = await prisma.patient.findUnique({
//       where: { id: appointment.patientId },
//       select: { accountId: true }
//     })

//     const doctorAccount = await prisma.doctor.findUnique({
//       where: { id: appointment.doctorId },
//       select: { accountId: true }
//     })

//     if (userRoleFromAuth !== 'ADMIN' &&
//       userIdFromAuth !== patientAccount?.accountId &&
//       userIdFromAuth !== doctorAccount?.accountId) {
//       return next(createError(403, 'Forbidden: You do not have access to these call logs.', 'authorization'));
//     }

//     const callLogs = await teleService.getCallLogsByAppointmentId(appointmentId)
//     res.status(200).json({ count: callLogs.length, callLogs })
//   } catch (error) {
//     next(error)
//   }
// }


// teleController.getNotificationsByUser = async (req, res, next) => {
//   try {
//     const userIdFromAuth = req.user.id;
//     const notifications = await teleService.getNotificationsByUserId(userIdFromAuth)
//     res.status(200).json({ count: notifications.length, notifications })
//   } catch (error) {
//     next(error)
//   }
// }


// teleController.markNotificationAsRead = async (req, res, next) => {
//   try {
//     const { notificationId } = req.params;
//     const userIdFromAuth = req.user.id;

//     const updatedNotification = await teleService.setNotificationRead(notificationId, userIdFromAuth)
//     res.status(200).json({ message: 'Notification marked as read successfully.', notification: updatedNotification })
//   } catch (error) {
//     next(error)
//   }
// }


// teleController.deleteNotification = async (req, res, next) => {
//   try {
//     const { notificationId } = req.params;
//     const userIdFromAuth = req.user.id;
//     const userRoleFromAuth = req.user.role;

//     await teleService.deleteExistingNotification(notificationId,userIdFromAuth,userRoleFromAuth)
//     res.status(200).json({ message: 'Notification deleted successfully.'})
//   } catch (error) {
//     next(error)
//   }
// }


export default teleController