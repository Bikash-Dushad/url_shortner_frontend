import axios from "axios";

// Create Axios instance
const Instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach Token)
Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor (Handle Status Codes)
Instance.interceptors.response.use(
  (response) => {
    return response; // If the response is successful (200, 201)
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        message: "Network error. Please try again.",
      });
    }
  },
);

export default Instance;
