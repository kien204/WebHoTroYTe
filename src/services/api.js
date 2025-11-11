import axios from "axios";

const api = axios.create({
  baseURL: "https://td6tscmq-5092.asse.devtunnels.ms/api",
  //  baseURL: "http://10.15.15.4:5092/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;
