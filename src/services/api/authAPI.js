// src/api/authApi.js
import api from "../api";

const authApi = {
  login: (data) => api.post("/Taikhoan/login", data),
  register: (data) => api.post("/TaiKhoan/register", data),
  verify_otp: (data) => api.post("/Taikhoan/verify-otp", data),
  resend_otp: (data) => api.post("/Taikhoan/resend-otp", data),
  forgot_password: (data) => api.post("/Taikhoan/forgot-password", data),
  reset_password: (data) => api.put("/Taikhoan/reset-password", data),
};

export default authApi;
