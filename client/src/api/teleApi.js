import axiosInstance from "../config/axios.js"

const teleApi = {};

// --- Twilio Token APIs ---
teleApi.getTwilioVideoToken = async (userId, roomId) => {
  console.log('teleApi.getTwilioVideoToken')
  try {
    const response = await axiosInstance.post('/api/tele/token/video', { userId, roomId });
    console.log('response', response)
    return response.data.token;
  } catch (error) {
    console.error("Failed to fetch Twilio video token:", error);
    throw error;
  }
}

teleApi.getTwilioVoiceToken = async (userId) => {
  console.log('teleApi.getTwilioVoiceToken')
  try {
    const response = await axiosInstance.post('/api/tele/token/voice', { userId });
    console.log('response', response)
    return response.data.token;
  } catch (error) {
    console.error("Failed to fetch Twilio voice token:", error);
    throw error;
  }
}

// --- Chat Message APIs ---
teleApi.sendChatMessage = async (messageData) => {
  console.log('teleApi.sendChatMessage')
  try {
    const response = await axiosInstance.post('/api/tele/chat/messages', messageData);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw error;
  }
}


teleApi.getChatMessagesByAppointment = async (appointmentId) => {
  console.log('teleApi.getChatMessagesByAppointment')
  try {
    const response = await axiosInstance.get(`/api/tele/chat/appointments/${appointmentId}/messages`);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch chat messages for appointment ${appointmentId}:`, error);
    throw error;
  }
}


teleApi.markChatMessageAsRead = async (messageId) => {
  console.log('teleApi.markChatMessageAsRead')
  try {
    const response = await axiosInstance.put(`/api/tele/chat/messages/${messageId}/read`);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error(`Failed to mark message ${messageId} as read:`, error);
    throw error;
  }
}


// --- Call Log APIs ---
teleApi.logCall = async (callData) => {
  console.log('teleApi.logCall')
  try {
    const response = await axiosInstance.post('/api/tele/calls/logs', callData);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error("Failed to log call:", error);
    throw error;
  }
}


teleApi.updateCallLog = async (callId, updateData) => {
  console.log('teleApi.updateCallLog')
  try {
    const response = await axiosInstance.put(`/api/tele/calls/logs/${callId}`, updateData);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error(`Failed to update call log ${callId}:`, error);
    throw error;
  }
}


teleApi.getCallLogsByAppointment = async (appointmentId) => {
  console.log('teleApi.getCallLogsByAppointment')
  try {
    const response = await axiosInstance.get(`/api/tele/calls/appointments/${appointmentId}/logs`);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch call logs for appointment ${appointmentId}:`, error);
    throw error;
  }
}


// --- Notification APIs ---
teleApi.getNotificationsByUser = async () => {
  console.log('teleApi.getNotificationsByUser')
  try {
    const response = await axiosInstance.get(`/api/tele/notifications/me`); 
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user notifications:", error);
    throw error;
  }
}


teleApi.markNotificationAsRead = async (notificationId) => {
  console.log('teleApi.markNotificationAsRead')
  try {
    const response = await axiosInstance.put(`/api/tele/notifications/${notificationId}/read`);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error(`Failed to mark notification ${notificationId} as read:`, error);
    throw error;
  }
}


teleApi.deleteNotification = async (notificationId) => {
  console.log('teleApi.deleteNotification')
  try {
    const response = await axiosInstance.delete(`/api/tele/notifications/${notificationId}`);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error(`Failed to delete notification ${notificationId}:`, error);
    throw error;
  }
}


export default teleApi;