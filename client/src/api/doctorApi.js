import axiosInstance from "../config/axios.js";

const doctorApi = {};

doctorApi.updateProfile = (body) => {
  return axiosInstance.put("/api/doctor/profile", body);
};

doctorApi.getAllSpecialties = () => {
  return axiosInstance.get("/api/specialty");
};

export default doctorApi;
