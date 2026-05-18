import axios from "../lib/axios";

export const apiGetDirectory = (params) =>
  axios({
    url: "api/directory",
    method: "get",
    params,
  });

export const apiAddDirectory = (data) =>
  axios({
    url: "api/directory/add-directory",
    method: "post",
    data,
  });

export const apiUpdateDirectory = (id, data) =>
  axios({
    url: `api/directory/update-directory/${id}`,
    method: "put",
    data,
  });
export const apiDeleteDirectory = (id) =>
  axios({
    url: `api/directory/delete-directory/${id}`,
    method: "delete",
  });
