import axios from "axios";
import authStore from "../stores/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem('accessToken') || authStore.getState().token
    const accessToken = authStore.getState().token;
    // console.log('accessToken test====', accessToken)

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // console.log('err.response.status', err.response.status)

//     if (err.response && err.response.status === 401 && !originalRequest._retry) {

//       // ดัก 401 all method
//       if (originalRequest._retry ) {
//         return Promise.reject(err)
//       }

//       originalRequest._retry = true

//       try {
//         const response = await axiosInstance.get('auth/refresh', { _retry: true })


//         const newAccessToken = response.data.accessToken
//         localStorage.setItem('accessToken', newAccessToken)
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
//         return axiosInstance(originalRequest)
//       } catch (error) {
//         console.error("Session expired, logging out.", error);
//         localStorage.removeItem('accessToken')
//         return Promise.reject(error)
//       }

//     }
//     return Promise.reject(err);
//   }
// )


// Response Interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post('auth/refresh');
        const { accessToken } = response.data;
        
        
        authStore.getState().setAuth({ accessToken, user: authStore.getState().user });

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Session expired, logging out.", error);
        
        authStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance