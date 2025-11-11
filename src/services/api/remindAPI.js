import api from "../api";

const overViewAPI = {
  create: (data) => api.post(`/Remind/create`, data),
  delete: (id) => api.delete(`/Remind/delete/${id}`),
  get: (id) => api.get(`/Remind/all/${id}`),
};

export default overViewAPI;
