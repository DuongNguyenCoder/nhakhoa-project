import axios from "../lib/axios";

export const apiAddWarranty = (data) =>
  axios({
    url: "/api/warrantie/add-warrantie",
    method: "post",
    data,
  });

export const apiUpdateWarranty = (id, data) =>
  axios({
    url: `/api/warrantie/update-warrantie/${id}`,
    method: "put",
    data,
  });
export const apiDeleteWarranty = (id) =>
  axios({
    url: `/api/warrantie/delete-warrantie/${id}`,
    method: "delete",
  });
export const apiGetOneWarranty = (id) =>
  axios({
    url: `/api/warrantie/${id}`,
    method: "get",
  });
export const apiGetAllWarranty = (params) =>
  axios({
    url: "/api/warrantie",
    method: "get",
    params,
  });
