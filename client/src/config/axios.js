
import axios from 'axios';
import authStore from '../stores/authStore.js';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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
                toast.error('Session expired. Please log in again.');
                authStore.getState().logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 500) {
            console.error('Server Internal Error detected. Redirecting to Server Error page.');
            toast.error('An unexpected server error occurred. Please try again later.');
            return Promise.reject(error);
        }

        if (error.response?.status === 503) {
            console.warn('Application is under maintenance. Redirecting to Maintenance page.');
            toast.info('Our website is currently under maintenance. Please check back soon.');
            window.location.href = '/maintenance';
            return Promise.reject(error);
        }

        if (error.response?.status === 403) {
            console.warn('Access Forbidden. Redirecting to Home page.');
            toast.error('You do not have permission to access this resource.');
            window.location.href = '/';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;