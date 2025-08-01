import axiosInstance from "../config/axios.js";

const adminTeleApi = {};

adminTeleApi.createTeleAppointment = (body) => {
  return axiosInstance.post("/api/admin/tele", body);
};


adminTeleApi.getAppointmentDetails = (id) => {
  return axiosInstance.get(`/api/admin/tele/${id}`);
};


adminTeleApi.getAppointmentByRoomId = (roomId) => {
  return axiosInstance.get(`/api/admin/tele/byRoomId/${roomId}`);
};

adminTeleApi.updateAppointmentStatus = (id, body) => {
  return axiosInstance.patch(`/api/admin/tele/${id}/status`, body);
};

adminTeleApi.deleteTeleAppointment = (id) => {
  return axiosInstance.delete(`/api/admin/tele/${id}`);
};

export default adminTeleApi;
