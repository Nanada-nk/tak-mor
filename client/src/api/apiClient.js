import axios from "axios";

// สร้างและตั้งค่า Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ตั้งค่า Interceptor เพื่อดักจับ request ก่อนส่งออกไป
apiClient.interceptors.request.use(
  (config) => {
    // ดึง token จาก localStorage
    const token = localStorage.getItem("ACCESS_TOKEN");
    
    // ถ้ามี token ให้เพิ่ม Authorization header เข้าไป
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