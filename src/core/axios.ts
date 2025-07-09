import axios from "axios";
import { deviceInfo } from "./device";

const backend_url = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
  baseURL: backend_url,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["x-device-info"] = JSON.stringify(deviceInfo);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
