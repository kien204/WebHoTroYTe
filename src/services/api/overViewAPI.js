import api from "../api";

const overViewAPI = {
  getdata1: (id) => api.get(`/TotalViews/totalView/${id}`),
  getdata2: (id) => api.get(`/TotalViews/chartbloodpressure/${id}`),
  getdata3: (id) => api.get(`/TotalViews/compare/${id}`),
  getdata4: (id) => api.get(`/TotalViews/comment/${id}`),
};

export default overViewAPI;
