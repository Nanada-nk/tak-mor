// 1. นำเข้า apiClient ที่เราสร้างไว้
import apiClient from "./apiClient";

const authApi = {};

// 2. ใช้ apiClient เรียกไปยัง endpoint ต่างๆ
authApi.register = (body) => {
  return apiClient.post("/auth/register", body);
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