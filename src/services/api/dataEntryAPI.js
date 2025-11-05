import api from "../api";

const dataEntryApi = {
  createform1: (data) => api.post("/BloodPressure/create", data),
  createform3: (data) => api.post("/BloodSugar/create", data),
  createform2: (data) => api.post("/HeartRate/create", data),
  createform4: (data) => api.post("/Sleep/create", data),

  putform1: (data, id) => api.put(`/BloodPressure/update/${id}`, data),
  putform3: (data, id) => api.put(`/BloodSugar/update/${id}`, data),
  putform2: (data, id) => api.put(`/HeartRate/update/${id}`, data),
  putform4: (data, id) => api.put(`/Sleep/today/${id}`, data),

  getnewfrom1: (id) => api.get(`/BloodPressure/Recently/${id}`),
  getnewfrom3: (id) => api.get(`/BloodSugar/Recently/${id}`),
  getnewfrom2: (id) => api.get(`/HeartRate/Recently/${id}`),
  getnewfrom4: (id) => api.get(`/Sleep/Recently/${id}`),

  getTodayfrom1: (id) => api.get(`/BloodPressure/Today/${id}`),
  getTodayfrom3: (id) => api.get(`/BloodSugar/Today/${id}`),
  getTodayfrom2: (id) => api.get(`/HeartRate/Today/${id}`),
  getTodayfrom4: (id) => api.get(`/Sleep/TOday/${id}`),
};

export default dataEntryApi;
