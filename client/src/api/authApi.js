import axiosInstance from "../config/axios.js";

const authApi = {};


authApi.registerPatient = (body) => {
  return axiosInstance.post("/auth/register/patient", body);
};
authApi.registerDoctor = (body) => {
  return axiosInstance.post("/auth/register/doctor", body);
};

authApi.login = (body) => {
  return axiosInstance.post("/auth/login", body);
};

authApi.getMe = () => {
  return axiosInstance.get("/auth/me");
};

authApi.forgotPassword = (body) => {
  return axiosInstance.post("/auth/forgot-password", body);
};


authApi.verifyOtp = (body) => {
  return axiosInstance.post("/auth/verify-otp", body);
};

authApi.resetPassword = (body) => {
  return axiosInstance.post("/auth/reset-password", body);
};

export default authApi;
