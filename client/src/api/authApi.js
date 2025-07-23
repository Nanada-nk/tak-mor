import apiClient from "./apiClient";

const authApi = {};

// 2. ใช้ apiClient เรียกไปยัง endpoint ต่างๆ
authApi.registerPatient = (body) => {
  return apiClient.post("/auth/register/patient", body);
};

authApi.login = (body) => {
  return apiClient.post("/auth/login", body);
};

authApi.getMe = () => {
  return apiClient.get("/auth/me");
};

authApi.forgotPassword = (body) => {
  return apiClient.post("/auth/forgot-password", body);
};

authApi.resetPassword = (body) => {
  return apiClient.post("/auth/reset-password", body);
};

export default authApi;
