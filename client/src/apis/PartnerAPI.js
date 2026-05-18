import axios from "../lib/axios";

export const apiAddPartner = (data) =>
  axios({
    url: "/api/partner/add-partner",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const apiUpdatePartner = (id, data) =>
  axios({
    url: `/api/partner/update-partner/${id}`,
    method: "put",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const apiDeletePartner = (id) =>
  axios({
    url: `/api/partner/delete-partner/${id}`,
    method: "delete",
  });
export const apiGetPartner = (params) =>
  axios({
    url: "/api/partner",
    method: "get",
    params,
  });
