import axiosInstance from "../config/axios.js";

const authApi = {};

authApi.registerPatient = (body) => {
  return axiosInstance.post("/api/auth/register/patient", body);
};
authApi.registerDoctor = (body) => {
  return axiosInstance.post("/api/auth/register/doctor", body);
};

authApi.login = (body) => {
  return axiosInstance.post("/api/auth/login", body);
};


authApi.getMe = () => {
  return axiosInstance.get("/api/auth/me");
};

authApi.forgotPassword = (body) => {
  return axiosInstance.post("/api/auth/forgot-password", body);
};

authApi.verifyOtp = (body) => {
  return axiosInstance.post("/api/auth/verify-otp", body);
};

authApi.resetPassword = (body) => {
  return axiosInstance.post("/api/auth/reset-password", body);
};

export default authApi;