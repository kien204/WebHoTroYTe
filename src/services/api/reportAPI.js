import api from "../api";

const reportAPI = {
  getdata1: (id, start, end) => {
    let url = `/Report/getdata-table/${id}?Start=${start}`;
    if (end !== undefined && end !== null) {
      url += `&End=${end}`;
    }
    return api(url);
  },
  getdata2: (id, start, end) => {
    let url = `/Report/export-pdf/${id}?Start=${start}`;
    if (end !== undefined && end !== null) {
      url += `&End=${end}`;
    }
    return api(url);
  },
  getdata3: (id, start, end) => {
    let url = `/Report/chart/${id}?Start=${start}`;
    if (end !== undefined && end !== null) {
      url += `&End=${end}`;
    }
    return api(url);
  },
};

export default reportAPI;
