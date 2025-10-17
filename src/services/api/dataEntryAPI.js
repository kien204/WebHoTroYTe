import api from "../api";

const dataEntryApi = {
  data: (data) => api.post("/Health/create", data),
};

export default dataEntryApi;
