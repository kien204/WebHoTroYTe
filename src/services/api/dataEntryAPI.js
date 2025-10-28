import api from "../api";

const dataEntryApi = {
  createform1: (data) => api.post("/BloodPressure/create", data),
  createform3: (data) => api.post("/BloodSugar/create", data),
  createform2: (data) => api.post("/HeartRate/create", data),
  createform4: (data) => api.post("/Sleep/create", data),

  getnewfrom1: (id) => api.get(`/BloodPressure/Recently/${id}`),
  getnewfrom2: (id) => api.get(`/BloodSugar/Recently/${id}`),
  getnewfrom3: (id) => api.get(`/HeartRate/Recently/${id}`),
  getnewfrom4: (id) => api.get(`/Sleep/Recently/${id}`),
};

export default dataEntryApi;
