import axios from "../lib/axios";

export const apiAddNew = (data) =>
  axios({
    url: "api/new/add-new",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
export const apiUpdateNew = (id, data) =>
  axios({
    url: `api/new/update-new/${id}`,
    method: "put",
    data,
  });
export const apiDeleteNew = (id) =>
  axios({
    url: `api/new/delete-new/${id}`,
    method: "delete",
  });
export const apiGetNew = (params) =>
  axios({
    url: "api/new",
    method: "get",
    params,
  });
