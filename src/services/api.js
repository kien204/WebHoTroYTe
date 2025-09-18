import axios from "axios";

// Tạo instance Axios dùng chung
const api = axios.create({
  baseURL: "http://10.15.92.224:5092/api", // Thay bằng URL backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000, // 10 giây timeout
});

// Thêm token vào header nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // hoặc sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi response chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Ví dụ: 401 Unauthorized → logout hoặc redirect login
      if (error.response.status === 401) {
        console.log("Yêu cầu token, chuyển hướng đến đăng nhập");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      // Có thể handle thêm 403, 500...
    }
    return Promise.reject(error);
  }
);

export default api;
