import axiosInstance from "../config/axios.js";
const patientApi = {};


patientApi.getAppointments = (patientId) => {
  return axiosInstance.get(`/api/appointment/patient/${patientId}`);
};



patientApi.updateMedicalProfile = (patientId, body) => {
  return axiosInstance.put(`/api/patient/${patientId}/profile`, body);
};


patientApi.updatePatientInfo = (patientId, body) => {
  return axiosInstance.put(`/api/patient/${patientId}/info`, body);
};

export default patientApi;
