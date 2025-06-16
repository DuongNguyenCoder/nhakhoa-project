import axios from "../../axios";

export const apiGetCategory = (params) =>
  axios({
    url: "/api/category",
    method: "get",
    params,
  });

export const apiAddCategory = (data) =>
  axios({
    url: "/api/category/add-category",
    method: "post",
    data,
  });

export const apiUpdateCategory = (id, data) =>
  axios({
    url: `/api/category/update-category/${id}`,
    method: "put",
    data,
  });
export const apiDeleteCategory = (id) =>
  axios({
    url: `/api/category/delete-category/${id}`,
    method: "delete",
  });
