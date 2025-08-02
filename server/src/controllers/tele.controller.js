import prisma from "../config/prisma.config.js";
import teleService from "../services/tele.service.js"
import createError from "../utils/create-error.js"

const teleController = {}

teleController.generateTwilioVideoToken = async (req, res, next) => {
  console.log('teleController.generateTwilioVideoToken ====')
  const { userId, roomId } = req.body;
  try {
    if (!userId || !roomId) {
      return next(createError(400, 'userId and roomId are required.', 'missing_fields'));
    }
    const token = await teleService.generateTwilioVideoToken(userId, roomId);
    console.log('token', token)
    res.status(200).json({
      success: true,
      token: token,
      message: 'Twilio video token generated successfully.'
    });
    console.log('Twilio video token generated successfully.')
  } catch (error) {
    next(error)
  }
}

teleController.generateTwilioVoiceToken = async (req, res, next) => {
  console.log('teleController.generateTwilioVoiceToken')
  const { userId } = req.body;
  try {
    if (!userId) {
      return next(createError(400, 'userId is required for voice token.', 'missing_fields'));
    }
    const token = await teleService.generateTwilioVoiceToken(userId);
    console.log('token', token)
    res.status(200).json({
      success: true,
      token: token,
      message: 'Twilio voice token generated successfully.'
    });
    console.log('Twilio voice token generated successfully.')
  } catch (error) {
    next(error);
  }
};

teleController.handleVoiceTwiML = async (req, res, next) => {
  console.log('teleController.handleVoiceTwiML')
    try {
        const twiml = new twilio.twiml.VoiceResponse();
        const callTo = req.body.To;
        
        if (callTo) {
            const dial = twiml.dial();
            console.log('dial', dial)
            dial.client(callTo);
        } else {
            twiml.say('The number you have dialed is not available.');
        }

        res.set('Content-Type', 'text/xml');
        res.status(200).send(twiml.toString());

    } catch (error) {
        next(error);
    }
};

teleController.sendChatMessage = async (req, res, next) => {
  console.log('teleController.sendChatMessage ====')
  try {
    const { appointmentId, senderId, receiverId, messageContent, messageType, mediaUrl } = req.body;
    const userIdFromAuth = req.user.id;

    if (!appointmentId || !senderId || !messageContent) {
      return next(createError(400, 'Missing required fields for chat message.', 'missing_fields'));
    }

    if (userIdFromAuth !== senderId) {
      return next(createError(403, 'Forbidden: You cannot send messages as another user.', 'sender_id_mismatch'));
    }


    const newMessage = await teleService.createChatMessage({
      appointmentId,
      senderId,
      receiverId,
      messageContent,
      messageType,
      mediaUrl
    });
    console.log('newMessage', newMessage)

    res.status(201).json({
      message: 'Chat message sent successfully.',
      chatMessage: newMessage
    });
  } catch (error) {
    next(error);
  }
};


teleController.getChatMessagesByAppointment = async (req, res, next) => {
  console.log('teleController.getChatMessagesByAppointment')
  try {
    const { appointmentId } = req.params;
    const userIdFromAuth = req.user.id;
    const userRoleFromAuth = req.user.role;

    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(appointmentId) },
      select: { patientId: true, doctorId: true }
    });

    if (!appointment) {
      return next(createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id'));
    }

    const patientAccount = await prisma.patient.findUnique({
      where: { id: appointment.patientId },
      select: { accountId: true }
    });
    const doctorAccount = await prisma.doctor.findUnique({
      where: { id: appointment.doctorId },
      select: { accountId: true }
    });

    if (userRoleFromAuth !== 'ADMIN' &&
      userIdFromAuth !== patientAccount?.accountId &&
      userIdFromAuth !== doctorAccount?.accountId) {
      return next(createError(403, 'Forbidden: You do not have access to these messages.', 'authorization'));
    }

    const messages = await teleService.getMessagesByAppointment(appointmentId);
    console.log('messages', messages)
    res.status(200).json({ count: messages.length, messages });
  } catch (error) {
    next(error);
  }
};


teleController.markChatMessageAsRead = async (req, res, next) => {
  console.log('teleController.markChatMessageAsRead')
  try {
    const { messageId } = req.params;
    const userIdFromAuth = req.user.id;

    const updatedMessage = await teleService.setChatMessageRead(messageId, userIdFromAuth);
    console.log('updatedMessage', updatedMessage)
    res.status(200).json({
      message: 'Chat message marked as read successfully.',
      chatMessage: updatedMessage
    });
  } catch (error) {
    next(error);
  }
}


teleController.logCall = async (req, res, next) => {
  console.log('teleController.logCall')
  try {
    const { appointmentId, callerId, receiverId, callType, startTime, endTime, durationMinutes, status, webRTCSessionId } = req.body;
    const userIdFromAuth = req.user.id;


    if (!appointmentId || !callerId || !receiverId || !callType || !startTime) {
      return next(createError(400, 'Missing required fields for call log.', 'missing_fields'));
    }

    if (userIdFromAuth !== callerId && userIdFromAuth !== receiverId) {
      return next(createError(403, 'Forbidden: You cannot log calls for other users.', 'user_id_mismatch'));
    }

    const newCallLog = await teleService.createCallLog({
      appointmentId,
      callerId,
      receiverId,
      callType,
      startTime,
      endTime,
      durationMinutes,
      status,
      webRTCSessionId
    });
    console.log('newCallLog', newCallLog)

    res.status(201).json({
      message: 'Call log recorded successfully.',
      callLog: newCallLog
    });
  } catch (error) {
    next(error);
  }
}


teleController.updateCallLog = async (req, res, next) => {
  console.log('teleController.updateCallLog')
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userIdFromAuth = req.user.id;

    const updatedCallLog = await teleService.updateExistingCallLog(id, updateData, userIdFromAuth);
    console.log('updatedCallLog', updatedCallLog)
    res.status(200).json({
      message: 'Call log updated successfully.',
      callLog: updatedCallLog
    });
  } catch (error) {
    next(error);
  }
}


teleController.getCallLogsByAppointment = async (req, res, next) => {
  console.log('getCallLogsByAppointment')
  try {
    const { appointmentId } = req.params;
    const userIdFromAuth = req.user.id;
    const userRoleFromAuth = req.user.role;
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(appointmentId) },
      select: { patientId: true, doctorId: true }
    });

    if (!appointment) {
      return next(createError(404, `Appointment with ID ${appointmentId} not found.`, 'appointment_id'));
    }

    const patientAccount = await prisma.patient.findUnique({
      where: { id: appointment.patientId },
      select: { accountId: true }
    });
    const doctorAccount = await prisma.doctor.findUnique({
      where: { id: appointment.doctorId },
      select: { accountId: true }
    });

    if (userRoleFromAuth !== 'ADMIN' &&
      userIdFromAuth !== patientAccount?.accountId &&
      userIdFromAuth !== doctorAccount?.accountId) {
      return next(createError(403, 'Forbidden: You do not have access to these call logs.', 'authorization'));
    }

    const callLogs = await teleService.getCallLogsByAppointmentId(appointmentId);
    console.log('callLogs', callLogs)
    res.status(200).json({ count: callLogs.length, callLogs });
  } catch (error) {
    next(error);
  }
}


teleController.getNotificationsByUser = async (req, res, next) => {
  console.log('teleController.getNotificationsByUser')
  try {
    const userIdFromAuth = req.user.id;
    const notifications = await teleService.getNotificationsByUserId(userIdFromAuth);
    console.log('notifications', notifications)
    res.status(200).json({ count: notifications.length, notifications });
  } catch (error) {
    next(error);
  }
}


teleController.markNotificationAsRead = async (req, res, next) => {
  console.log('teleController.markNotificationAsRead')
  try {
    const { notificationId } = req.params;
    const userIdFromAuth = req.user.id;
    const updatedNotification = await teleService.setNotificationRead(notificationId, userIdFromAuth);
    console.log('updatedNotification', updatedNotification)
    res.status(200).json({
      message: 'Notification marked as read successfully.',
      notification: updatedNotification
    });
  } catch (error) {
    next(error);
  }
}


teleController.deleteNotification = async (req, res, next) => {
  console.log('teleController.deleteNotification')
  try {
    const { notificationId } = req.params;
    const userIdFromAuth = req.user.id;
    const userRoleFromAuth = req.user.role;

    await teleService.deleteExistingNotification(notificationId, userIdFromAuth, userRoleFromAuth);
    res.status(200).json({ message: 'Notification deleted successfully.' });
    console.log('Notification deleted successfully.')
  } catch (error) {
    next(error);
  }
}





export default teleController