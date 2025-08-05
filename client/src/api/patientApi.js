import axiosInstance from "../config/axios.js";
const patientApi = {};




// Fetch all appointments for a patient
patientApi.getAppointments = (patientId) => {
  return axiosInstance.get(`/api/appointment/patient/${patientId}`);
};


// Update patient medical profile
patientApi.updateMedicalProfile = (patientId, body) => {
  return axiosInstance.put(`/api/patient/${patientId}/profile`, body);
};

// Update patient basic info (firstName, lastName, address)
patientApi.updatePatientInfo = (patientId, body) => {
  return axiosInstance.put(`/api/patient/${patientId}/info`, body);
};

export default patientApi;
