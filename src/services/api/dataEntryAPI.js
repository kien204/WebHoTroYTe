import api from "../api";

const dataEntryApi = {
  createform1: (data) => api.post("/BloodPressure/create", data),
  createform2: (data) => api.post("/BloodSugar/create", data),
  createform3: (data) => api.post("/HeartRate/create", data),
  createform4: (data) => api.post("/Sleep/create", data),

  getnewfrom1: (id) => api.post(`/BloodPressure/today/${id}`),
  getnewfrom2: (id) => api.post(`/BloodSugar/today/${id}`),
  getnewfrom3: (id) => api.post(`/HeartRate/today/${id}`),
  getnewfrom4: (id) => api.post(`/Sleep/today/${id}`),
};

export default dataEntryApi;
