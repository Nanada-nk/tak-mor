import axiosInstance from "../config/axios.js";

const doctorApi = {};

// Fetch all appointments for a doctor
doctorApi.getAppointments = (doctorId) => {
  return axiosInstance.get(`/api/appointment/doctor/${doctorId}`);
};

doctorApi.updateProfile = (body) => {
  return axiosInstance.put("/api/doctor/profile", body);
};

doctorApi.getAllSpecialties = () => {
  return axiosInstance.get("/api/specialty");
};

export default doctorApi;
