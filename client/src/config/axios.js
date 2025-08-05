import axios from 'axios';
import authStore from '../stores/authStore.js';
import { toast } from 'react-toastify';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    withCredentials: true, 
});


let csrfToken = null;
let isRefreshing = false;
let failedQueue = [];


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


const CSRF_METHODS = ['post', 'put', 'patch', 'delete'];


export const fetchCsrfToken = async () => {
    if (csrfToken) {
        
        return csrfToken;
    }
    try {
        const { data } = await axiosInstance.get('/csrf-token');
        csrfToken = data.csrfToken;
        console.log('CSRF Token has been fetched and stored.');
        return csrfToken;
    } catch (err) {
        console.error('Could not fetch CSRF token:', err);
      
        throw err;
    }
};


axiosInstance.interceptors.request.use(
    (config) => {
        
        const token = authStore.getState().token;
        if (token && !config.headers['Authorization']) { 
            config.headers['Authorization'] = `Bearer ${token}`;
        }


        if (csrfToken && CSRF_METHODS.includes(config.method?.toLowerCase())) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { response, config: originalRequest } = error;


        if (
            response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.endsWith('/api/auth/refresh') 
        ) {
            originalRequest._retry = true; 

            if (!isRefreshing) { 
                isRefreshing = true; 
                console.log('Access token expired. Attempting to refresh...');

                try {
    
                    const { data } = await axiosInstance.post('/api/auth/refresh');
                    const { accessToken, user } = data; 

                    
                    authStore.getState().setAuth({ accessToken, user });
                    console.log('Token refreshed successfully.');

                    
                    processQueue(null, accessToken);

                    
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest); 

                } catch (refreshError) {
                    console.error('Session expired. Could not refresh token. Logging out.', refreshError);
                    toast.error('Session expired. Please log in again.');
                    authStore.getState().logout(); 
                    processQueue(refreshError, null); 
                  
                    if (import.meta.env.PROD) window.location.href = '/login';
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false; 
                }
            } else { 
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

       
        if (response?.status === 500) {
            console.error('Server Internal Error detected. Redirecting to Server Error page.');
            toast.error('An unexpected server error occurred. Please try again later.');
            return Promise.reject(error);
        }
        if (response?.status === 503) {
            console.warn('Application is under maintenance. Redirecting to Maintenance page.');
            toast.info('Our website is currently under maintenance. Please check back soon.');
            
            if (import.meta.env.PROD) window.location.href = '/maintenance';
            return Promise.reject(error);
        }
        if (response?.status === 403) {
            console.warn('Access Forbidden. Redirecting to Home page.');
            toast.error('You do not have permission to access this resource.');
            
            if (import.meta.env.PROD) window.location.href = '/';
            return Promise.reject(error);
        }

       
        return Promise.reject(error);
    }
);

export default axiosInstance;