import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: backend_url,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.match(/token=([^;]+)/)?.[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
