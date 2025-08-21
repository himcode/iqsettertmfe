import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Use Vite proxy for API requests
  withCredentials: true,
});

// Add a request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
