import axios from "axios";

let showToastGlobal = null;
export const setGlobalToast = (fn) => {
  showToastGlobal = fn;
};

let logoutGlobal = null;
export const setGlobalLogout = (fn) => {
  logoutGlobal = fn;
};

const api = axios.create({
  baseURL: "http://10.15.43.11:5092/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { token } = JSON.parse(authData);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (showToastGlobal) {
      // chỉ gọi showToastGlobal khi cần (server down, token hết hạn)
      if (err.response) {
        if (
          err.response.status === 401 &&
          !err.config.url.includes("/auth/login")
        ) {
          showToastGlobal("error", "Phiên hết hạn", "Vui lòng đăng nhập lại");
          if (logoutGlobal) logoutGlobal();
        } else if (err.response.status >= 500) {
          showToastGlobal("error", "Hệ thống lỗi", "Vui lòng thử lại sau");
        }
      } else if (err.request) {
        showToastGlobal("warn", "Mất kết nối", "Không thể kết nối đến server!");
      }
    }
    return Promise.reject(err);
  }
);

export default api;
