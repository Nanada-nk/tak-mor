import axiosInstance from "../config/axios.js"

const teleApi = {};

// --- Chat Message APIs ---
teleApi.sendChatMessage = async (messageData) => {
  try {
    const response = await axiosInstance.post('/api/tele/chat/messages', messageData);
    return response.data;
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw error;
  }
}


teleApi.getChatMessagesByAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.get(`/api/tele/chat/appointments/${appointmentId}/messages`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch chat messages for appointment ${appointmentId}:`, error);
    throw error;
  }
}


teleApi.markChatMessageAsRead = async (messageId) => {
  try {
    const response = await axiosInstance.put(`/api/tele/chat/messages/${messageId}/read`);
    return response.data;
  } catch (error) {
    console.error(`Failed to mark message ${messageId} as read:`, error);
    throw error;
  }
}


// --- Call Log APIs ---
teleApi.logCall = async (callData) => {
  try {
    const response = await axiosInstance.post('/api/tele/calls/logs', callData);
    return response.data;
  } catch (error) {
    console.error("Failed to log call:", error);
    throw error;
  }
}


teleApi.updateCallLog = async (callId, updateData) => {
  try {
    const response = await axiosInstance.put(`/api/tele/calls/logs/${callId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update call log ${callId}:`, error);
    throw error;
  }
}


teleApi.getCallLogsByAppointment = async (appointmentId) => {
  try {
    const response = await axiosInstance.get(`/api/tele/calls/appointments/${appointmentId}/logs`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch call logs for appointment ${appointmentId}:`, error);
    throw error;
  }
}


// --- Notification APIs ---
teleApi.getNotificationsByUser = async () => { 
  try {
    const response = await axiosInstance.get(`/api/tele/notifications/me`); 
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user notifications:", error);
    throw error;
  }
}


teleApi.markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axiosInstance.put(`/api/tele/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error(`Failed to mark notification ${notificationId} as read:`, error);
    throw error;
  }
}


teleApi.deleteNotification = async (notificationId) => {
  try {
    const response = await axiosInstance.delete(`/api/tele/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete notification ${notificationId}:`, error);
    throw error;
  }
}


export default teleApi;