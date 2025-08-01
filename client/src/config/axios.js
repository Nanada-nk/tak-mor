
// import axios from 'axios';
// import authStore from '../stores/authStore.js';
// import { toast } from 'react-toastify';

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     withCredentials: true,
// });


// let csrfToken = null;


// export const fetchCsrfToken = async () => {
//     try {
//         const { data } = await axiosInstance.get('/csrf-token');
//         csrfToken = data.csrfToken;
//         console.log('CSRF Token has been fetched.');
//     } catch (error) {
//         console.error('Could not fetch CSRF token:', error);
//     }
// };



// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = authStore.getState().token;
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         const methodsToProtect = ['post', 'put', 'patch', 'delete'];
//         if (csrfToken && methodsToProtect.includes(config.method.toLowerCase())) {
//             config.headers['X-CSRF-Token'] = csrfToken;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );



// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;


//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 console.log('Access token expired. Attempting to refresh...');


//                 const { data } = await axiosInstance.post('/api/auth/refresh');
//                 const { accessToken } = data;


//                 authStore.getState().setAuth({ accessToken, user: authStore.getState().user });
//                 console.log('Token refreshed successfully.');


//                 originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//                 return axiosInstance(originalRequest);

//             } catch (refreshError) {

//                 console.error('Session expired. Could not refresh token. Logging out.', refreshError);
//                 toast.error('Session expired. Please log in again.');
//                 authStore.getState().logout();
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         if (error.response?.status === 500) {
//             console.error('Server Internal Error detected. Redirecting to Server Error page.');
//             toast.error('An unexpected server error occurred. Please try again later.');
//             return Promise.reject(error);
//         }

//         if (error.response?.status === 503) {
//             console.warn('Application is under maintenance. Redirecting to Maintenance page.');
//             toast.info('Our website is currently under maintenance. Please check back soon.');
//             window.location.href = '/maintenance';
//             return Promise.reject(error);
//         }

//         if (error.response?.status === 403) {
//             console.warn('Access Forbidden. Redirecting to Home page.');
//             toast.error('You do not have permission to access this resource.');
//             window.location.href = '/';
//             return Promise.reject(error);
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;


import axios from 'axios';
import authStore from '../stores/authStore.js';
import { toast } from 'react-toastify';

// สร้าง Axios Instance หลัก
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // ใช้ VITE_API_BASE_URL จาก .env ของ Vite
    withCredentials: true, // สำคัญ: เพื่อให้ Browser ส่ง cookie (รวมถึง HttpOnly cookie เช่น Refresh Token) ข้าม Origin ได้
});

// ตัวแปรสำหรับเก็บ CSRF Token (ใน Module Scope)
let csrfToken = null;
// ตัวแปรสำหรับเช็คว่ากำลัง Refresh Token อยู่หรือไม่ เพื่อป้องกัน Infinite Loop
let isRefreshing = false;
// Queue สำหรับเก็บ Request ที่รอ Refresh Token
let failedQueue = [];

// Helper function เพื่อประมวลผล Request ที่รออยู่
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// กำหนด HTTP Methods ที่ต้องส่ง CSRF Token
const CSRF_METHODS = ['post', 'put', 'patch', 'delete'];


export const fetchCsrfToken = async () => {
    if (csrfToken) {
        // ถ้ามี token อยู่แล้ว ไม่ต้อง fetch ซ้ำ
        return csrfToken;
    }
    try {
        const { data } = await axiosInstance.get('/csrf-token');
        csrfToken = data.csrfToken;
        console.log('CSRF Token has been fetched and stored.');
        return csrfToken;
    } catch (err) {
        console.error('Could not fetch CSRF token:', err);
        // สามารถ throw error เพื่อให้ AppRouter จัดการได้
        throw err;
    }
};

// Interceptor สำหรับ Request: เพิ่ม Authorization Header และ CSRF Token
axiosInstance.interceptors.request.use(
    (config) => {
        // เพิ่ม Authorization Header (ถ้ามี Access Token)
        const token = authStore.getState().token;
        if (token && !config.headers['Authorization']) { // ตรวจสอบว่ายังไม่มี Header นี้
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // เพิ่ม CSRF Token สำหรับ method ที่ต้องป้องกัน
        // Browser จะจัดการ HttpOnly Refresh Token ใน Cookie โดยอัตโนมัติเมื่อ withCredentials เป็น true
        if (csrfToken && CSRF_METHODS.includes(config.method?.toLowerCase())) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor สำหรับ Response: จัดการ Refresh Token และ Error ทั่วไป
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { response, config: originalRequest } = error;

        // --- 1. จัดการ Access Token Expired (Status 401) ---
        // ตรวจสอบว่าเป็น 401 และยังไม่เคยลอง retry และไม่ใช่ Request สำหรับ Refresh Token เอง
        if (
            response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.endsWith('/api/auth/refresh') // ตรวจสอบว่าไม่ใช่ Request ของ Refresh Token เอง
        ) {
            originalRequest._retry = true; // ตั้งค่าว่าได้ลอง retry แล้ว

            if (!isRefreshing) { // ถ้ายังไม่มีการ Refresh Token อยู่
                isRefreshing = true; // ตั้งค่าว่ากำลัง Refresh Token
                console.log('Access token expired. Attempting to refresh...');

                try {
                    // เรียก API สำหรับ Refresh Token
                    // Browser จะส่ง HttpOnly Refresh Token ใน Cookie ไปให้ Backend โดยอัตโนมัติ
                    const { data } = await axiosInstance.post('/api/auth/refresh');
                    const { accessToken, user } = data; // สมมติว่า Backend ส่ง user กลับมาด้วย

                    // อัปเดต Access Token ใน authStore
                    authStore.getState().setAuth({ accessToken, user });
                    console.log('Token refreshed successfully.');

                    // ประมวลผล Request ที่รออยู่ทั้งหมดด้วย Access Token ใหม่
                    processQueue(null, accessToken);

                    // ตั้งค่า Authorization Header สำหรับ Request ปัจจุบัน
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest); // ส่ง Request เดิมซ้ำอีกครั้ง

                } catch (refreshError) {
                    console.error('Session expired. Could not refresh token. Logging out.', refreshError);
                    toast.error('Session expired. Please log in again.');
                    authStore.getState().logout(); // Logout ผู้ใช้
                    processQueue(refreshError, null); // แจ้ง Error ไปยัง Request ที่รออยู่
                    // Redirect ไปหน้า Login เฉพาะใน Production เพื่อไม่ให้รบกวน Dev
                    if (import.meta.env.PROD) window.location.href = '/login';
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false; // สิ้นสุดกระบวนการ Refresh
                }
            } else { // ถ้ากำลัง Refresh Token อยู่แล้ว ให้ Request นี้ไปรอใน Queue
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }
        }

        // --- 2. จัดการ Error อื่นๆ ---
        if (response?.status === 500) {
            console.error('Server Internal Error detected. Redirecting to Server Error page.');
            toast.error('An unexpected server error occurred. Please try again later.');
            // สามารถ Redirect ไปหน้า ServerErrorPage ได้ถ้ามี
            // if (import.meta.env.PROD) window.location.href = '/servererror';
            return Promise.reject(error);
        }
        if (response?.status === 503) {
            console.warn('Application is under maintenance. Redirecting to Maintenance page.');
            toast.info('Our website is currently under maintenance. Please check back soon.');
            // Redirect ไปหน้า Maintenance เฉพาะใน Production
            if (import.meta.env.PROD) window.location.href = '/maintenance';
            return Promise.reject(error);
        }
        if (response?.status === 403) {
            console.warn('Access Forbidden. Redirecting to Home page.');
            toast.error('You do not have permission to access this resource.');
            // Redirect ไปหน้า Home เฉพาะใน Production
            if (import.meta.env.PROD) window.location.href = '/';
            return Promise.reject(error);
        }

        // ถ้าไม่ใช่ Error ที่จัดการข้างต้น ให้ส่ง Promise.reject(error) ต่อไป
        return Promise.reject(error);
    }
);

export default axiosInstance;