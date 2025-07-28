// import axios from "axios";
// import authStore from "../stores/authStore";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true
// })

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const accessToken = localStorage.getItem('accessToken') || authStore.getState().token
//     const accessToken = authStore.getState().token;
//     console.log('accessToken test====', accessToken)

//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// // axiosInstance.interceptors.response.use(
// //   (res) => res,
// //   async (err) => {
// //     const originalRequest = err.config;

// //     // console.log('err.response.status', err.response.status)

// //     if (err.response && err.response.status === 401 && !originalRequest._retry) {

// //       // ดัก 401 all method
// //       if (originalRequest._retry ) {
// //         return Promise.reject(err)
// //       }

// //       originalRequest._retry = true

// //       try {
// //         const response = await axiosInstance.get('auth/refresh', { _retry: true })


// //         const newAccessToken = response.data.accessToken
// //         localStorage.setItem('accessToken', newAccessToken)
// //         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
// //         return axiosInstance(originalRequest)
// //       } catch (error) {
// //         console.error("Session expired, logging out.", error);
// //         localStorage.removeItem('accessToken')
// //         return Promise.reject(error)
// //       }

// //     }
// //     return Promise.reject(err);
// //   }
// // )


// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;
//     if (err.response && err.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axiosInstance.post('auth/refresh');
//         const { accessToken } = response.data;


//         authStore.getState().setAuth({ accessToken, user: authStore.getState().user });

//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (error) {
//         console.error("Session expired, logging out.", error);

//         authStore.getState().logout();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance


import axios from 'axios';
import authStore from '../stores/authStore.js';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE2_URL,
    withCredentials: true,
});


let csrfToken = null;


export const fetchCsrfToken = async () => {
    try {
        const { data } = await axiosInstance.get('/csrf-token');
        csrfToken = data.csrfToken;
        console.log('CSRF Token has been fetched.');
    } catch (error) {
        console.error('Could not fetch CSRF token:', error);
    }
};



axiosInstance.interceptors.request.use(
    (config) => {
        const token = authStore.getState().token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const methodsToProtect = ['post', 'put', 'patch', 'delete'];
        if (csrfToken && methodsToProtect.includes(config.method.toLowerCase())) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log('Access token expired. Attempting to refresh...');


                const { data } = await axiosInstance.post('/api/auth/refresh');
                const { accessToken } = data;


                authStore.getState().setAuth({ accessToken, user: authStore.getState().user });
                console.log('Token refreshed successfully.');


                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {

                console.error('Session expired. Could not refresh token. Logging out.', refreshError);
                authStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);

export default axiosInstance;