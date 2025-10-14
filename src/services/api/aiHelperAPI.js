// src/api/authApi.js
import api from "../api";

const aiHelperAPI = {
  getHistory: (id) => api.get(`/qa/History/${id}`),
  sendChat: (data) => api.post("/qa", data),
};

export default aiHelperAPI;
