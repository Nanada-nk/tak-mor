import axios from "axios";
import authStore from "../stores/authStore.js";
// สร้างและตั้งค่า Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

// ตั้งค่า Interceptor เพื่อดักจับ request ก่อนส่งออกไป
apiClient.interceptors.request.use(
  (config) => {
    // ดึง token จาก localStorage
    // const token = localStorage.getItem("ACCESS_TOKEN");
     let token = authStore.getState().token;
    console.log('Intercept', token)
    // ถ้ามี token ให้เพิ่ม Authorization header เข้าไป
    if (!token) {
      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const parsed = JSON.parse(stored)?.state;
        token = parsed?.token;
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export instance ที่ตั้งค่าแล้วออกไป
export default apiClient;