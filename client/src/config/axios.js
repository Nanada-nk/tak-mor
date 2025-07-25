import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem('accessToken')
console.log('Access token in axios', accessToken)
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response && err.response.status === 401 && !originalRequest._retry) {

      // ดัก 401 all method
      if (originalRequest._retry ) {
        return Promise.reject(err)
      }

      originalRequest._retry = true

      try {
        const response = await axiosInstance.get('auth/refresh', { _retry: true })


        const newAccessToken = response.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (error) {
        console.error("Session expired, logging out.", error);
        localStorage.removeItem('accessToken')
        return Promise.reject(error)
      }

    }
    return Promise.reject(err);
  }
)


export default axiosInstance