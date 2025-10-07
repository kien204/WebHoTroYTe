import api from "../api"; 

const managementAccountApi = {
  getAll: () => api.get("/MangementAccount"),

  getByIdOrEmail: (params) => api.get("/MangementAccount/find", { params }),

  delete: (id) => api.delete(`/MangementAccount/${id}`),

  lock: (id) => api.put(`/MangementAccount/lock/${id}`),

  unlock: (id) => api.put(`/MangementAccount/unlock/${id}`),

  resetPassword: (id, data) =>
    api.put(`/MangementAccount/reset-password/${id}`, data),
};

export default managementAccountApi;
