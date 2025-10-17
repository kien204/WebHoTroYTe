import api from "../api";
const setUpAlertsApi = {
  setAlertThresholds: (data) => api.post("/Health/create", data),
};
export default setUpAlertsApi;
