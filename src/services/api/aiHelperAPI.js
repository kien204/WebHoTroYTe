// src/api/authApi.js
import api from "../api";

const aiHelperAPI = {
  getHistory: (id) => api.get(`/qa/History/${id}`),
  sendChat: (data) => api.post("/qa", data),
  deleteHistory: (id, date) => api.delete(`/qa/History/${id}/${date}`),
};

export default aiHelperAPI;
