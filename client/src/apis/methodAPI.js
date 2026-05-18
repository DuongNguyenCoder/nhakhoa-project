import axios from "../lib/axios";

export const apiGetMethod = (params) =>
  axios({
    url: "api/method",
    method: "get",
    params,
  });

export const apiGetOneMethod = (id) =>
  axios({
    url: `api/method/${id}`,
    method: "get",
  });

export const apiAddMethod = (data) =>
  axios({
    url: "api/method/add-method",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiUpdateMethod = (id, data) =>
  axios({
    url: `api/method/update-method/${id}`,
    method: "put",
    data,
  });

export const apiDeleteMethod = (id) =>
  axios({
    url: `api/method/delete-method/${id}`,
    method: "delete",
  });
