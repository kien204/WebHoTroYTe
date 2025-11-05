import api from "../api";
const setUpAlertsApi = {
  setAlertThresholds: (data) => api.post("/Warning", data),
  get: (id) => api.get(`/Warning/user/${id}`),
  put: (data, id) => api.put(`/Warning/${id}`, data),
};
export default setUpAlertsApi;
