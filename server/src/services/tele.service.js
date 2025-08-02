import prisma from "../config/prisma.config.js";
import createError from "../utils/create-error.js"
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant
const VoiceGrant = AccessToken.VoiceGrant

const teleService = {}

teleService.generateTwilioVideoToken = async (userId, roomId) => {
  console.log('teleService.generateTwilioVideoToken')
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKeySid = process.env.TWILIO_API_KEY_SID;
  const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;

  if (!accountSid || !apiKeySid || !apiKeySecret) {
    throw createError(500, 'Twilio credentials not configured.', 'missing_twilio_credentials');
  }

  const token = new AccessToken(accountSid, apiKeySid, apiKeySecret, {
    identity: userId
  });
  console.log('token', token)

  const videoGrant = new VideoGrant({
    room: roomId,
  });
  console.log('videoGrant', videoGrant)

  token.addGrant(videoGrant);

  return token.toJwt();
};

teleService.generateTwilioVoiceToken = async (userId) => {
  console.log('teleService.generateTwilioVoiceToken')
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKeySid = process.env.TWILIO_API_KEY_SID;
  const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;

  if (!accountSid || !apiKeySid || !apiKeySecret) {
    throw createError(500, 'Twilio credentials not configured.', 'missing_twilio_credentials');
  }

  const token = new AccessToken(accountSid, apiKeySid, apiKeySecret, {
    identity: userId
  });
  console.log('token', token)

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_VOICE_APP_SID,
  });
  console.log('voiceGrant', voiceGrant)
  token.addGrant(voiceGrant);

  return token.toJwt();
};

teleService.createChatMessage = async (messageData) => {
  console.log('teleService.createChatMessage')
  const { appointmentId, senderId, receiverId, messageContent, messageType, mediaUrl } = messageData;

  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(appointmentId) },
    select: {
      patientId: true,
      doctorId: true,
      Patient: { select: { accountId: true } },
      Doctor: { select: { accountId: true } }
    },
  });

  if (!appointment) {
    throw createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id');
  }


  if (senderId !== appointment.Patient.accountId && senderId !== appointment.Doctor.accountId) {
    throw createError(403, 'Forbidden: Sender is not part of this appointment.', 'authorization');
  }


  const newMessage = await prisma.chatMessage.create({
    data: {
      appointmentId: parseInt(appointmentId),
      senderId: parseInt(senderId),
      receiverId: receiverId ? parseInt(receiverId) : null,
      messageContent,
      messageType: messageType || 'TEXT',
      mediaUrl: mediaUrl || null,
      isRead: false,
    },
  });
  console.log('newMessage', newMessage)
  return newMessage;
}

teleService.getMessagesByAppointment = async (appointmentId) => {
  console.log('teleService.getMessagesByAppointment')
  const messages = await prisma.chatMessage.findMany({
    where: { appointmentId: parseInt(appointmentId) },
    orderBy: { timestamp: 'asc' },
    include: {
      Sender: { select: { id: true, firstName: true, lastName: true } },
      Receiver: { select: { id: true, firstName: true, lastName: true } },
    },
  });
  console.log('messages', messages)
  return messages;
}

teleService.setChatMessageRead = async (messageId, userId) => {
  console.log('teleService.setChatMessageRead')
  const message = await prisma.chatMessage.findUnique({
    where: { id: parseInt(messageId) },
    select: { receiverId: true },
  });

  if (!message) {
    throw createError(404, `Chat message with ID ${messageId} not found.`, 'message_id');
  }

  if (message.receiverId !== userId) {
    throw createError(403, 'Forbidden: You are not authorized to mark this message as read.', 'authorization');
  }

  const updatedMessage = await prisma.chatMessage.update({
    where: { id: parseInt(messageId) },
    data: { isRead: true },
  });
  console.log('updatedMessage', updatedMessage)
  return updatedMessage;
}

teleService.createCallLog = async (callData) => {
  console.log('teleService.createCallLog')
  const { appointmentId, callerId, receiverId, callType, startTime, endTime, durationMinutes, status, webRTCSessionId } = callData;


  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(appointmentId) },
    select: {
      patientId: true,
      doctorId: true,
      Patient: { select: { accountId: true } },
      Doctor: { select: { accountId: true } }
    },
  });

  if (!appointment) {
    throw createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id');
  }


  if (
    (callerId !== appointment.Patient.accountId && callerId !== appointment.Doctor.accountId) ||
    (receiverId !== appointment.Patient.accountId && receiverId !== appointment.Doctor.accountId)
  ) {
    throw createError(403, 'Forbidden: Caller or receiver is not part of this appointment.', 'authorization');
  }


  const newCallLog = await prisma.callLog.create({
    data: {
      appointmentId: parseInt(appointmentId),
      callerId: parseInt(callerId),
      receiverId: parseInt(receiverId),
      callType,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : null,
      durationMinutes: durationMinutes ? parseInt(durationMinutes) : null,
      status: status || 'COMPLETED',
      webRTCSessionId: webRTCSessionId ? parseInt(webRTCSessionId) : null,
    },
  });
  console.log('newCallLog', newCallLog)
  return newCallLog;
}

teleService.updateExistingCallLog = async (callLogId, updateData, userId) => {
  console.log('teleService.updateExistingCallLog')
  const existingCallLog = await prisma.callLog.findUnique({
    where: { id: parseInt(callLogId) },

    select: { callerId: true, receiverId: true },
  });

  if (!existingCallLog) {
    throw createError(404, `Call Log with ID ${callLogId} not found.`, 'call_log_id');
  }


  if (userId !== existingCallLog.callerId && userId !== existingCallLog.receiverId) {
    throw createError(403, 'Forbidden: You are not authorized to update this call log.', 'authorization');
  }

  const updatedCallLog = await prisma.callLog.update({
    where: { id: parseInt(callLogId) },
    data: {
      endTime: updateData.endTime ? new Date(updateData.endTime) : undefined,
      durationMinutes: updateData.durationMinutes ? parseInt(updateData.durationMinutes) : undefined,
      status: updateData.status || undefined,
    },
  });
  console.log('updatedCallLog', updatedCallLog)
  return updatedCallLog;
}

teleService.getCallLogsByAppointmentId = async (appointmentId) => {
  console.log('teleService.getCallLogsByAppointmentId')
  const callLogs = await prisma.callLog.findMany({
    where: { appointmentId: parseInt(appointmentId) },
    orderBy: { startTime: 'asc' },
    include: {

      Caller: { select: { id: true, firstName: true, lastName: true } },
      Receiver: { select: { id: true, firstName: true, lastName: true } },
    },
  });
  console.log('callLogs', callLogs)
  return callLogs;
}

teleService.getNotificationsByUserId = async (userId) => {
  console.log('teleService.getNotificationsByUserId')
  const notifications = await prisma.notification.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: 'desc' },
  });
  console.log('notifications', notifications)
  return notifications;
}

teleService.setNotificationRead = async (notificationId, userId) => {
  console.log('teleService.setNotificationRead')
  const notification = await prisma.notification.findUnique({
    where: { id: parseInt(notificationId) },
    select: { userId: true },
  });

  if (!notification) {
    throw createError(404, `Notification with ID ${notificationId} not found.`, 'notification_id');
  }

  if (notification.userId !== userId) {
    throw createError(403, 'Forbidden: You are not authorized to mark this notification as read.', 'authorization');
  }

  const updatedNotification = await prisma.notification.update({
    where: { id: parseInt(notificationId) },
    data: { isRead: true },
  });
  console.log('updatedNotification', updatedNotification)
  return updatedNotification;
}

teleService.deleteExistingNotification = async (notificationId, userId, userRole) => {
  console.log('teleService.deleteExistingNotification')
  const notification = await prisma.notification.findUnique({
    where: { id: parseInt(notificationId) },
    select: { userId: true },
  });

  if (!notification) {
    throw createError(404, `Notification with ID ${notificationId} not found.`, 'notification_id');
  }

  if (notification.userId !== userId && userRole !== 'ADMIN') {
    throw createError(403, 'Forbidden: You are not authorized to delete this notification.', 'authorization');
  }

  await prisma.notification.delete({
    where: { id: parseInt(notificationId) },
  });
  console.log('await prisma.notification.delete success')
}


export default teleService