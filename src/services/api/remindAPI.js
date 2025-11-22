import api from "../api";

const warningAndReminder = {
  create: (data) => api.post(`/Remind/create`, data),
  delete: (id) => api.delete(`/Remind/delete/${id}`),
  get: (id) => api.get(`/Remind/all/${id}`),

  getWarning: (id, fill) => {
    const url = `/AutoWarnings/${id}`;
    if (fill) {
      return api.get(url + `?fill=${fill}`);
    }
    return api.get(url);
  },
  deleteWarning: (id) => api.delete(`/AutoWarnings/all/${id}`),
  deleteItemWarning: (id) => api.delete(`/AutoWarnings/${id}`),
};

export default warningAndReminder;
