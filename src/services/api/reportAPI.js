import api from "../api";

const reportAPI = {
  getdata1: (id) => api(`${id}`),
  getdata2: (id) => api(`${id}`),
  getdata3: (id) => api(`${id}`),
  getdata4: (id) => api(`${id}`),
};

export default reportAPI;