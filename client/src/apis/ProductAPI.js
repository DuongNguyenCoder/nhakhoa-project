import axios from "../lib/axios";

export const apiGetAllProduct = (query) =>
  axios({
    url: `/api/product`,
    method: "get",
    params: query,
  });

export const apiGetOneProduct = (id) =>
  axios({
    url: `/api/product/${id}`,
    method: "get",
  });

export const apiAddProduct = (data) =>
  axios({
    url: "/api/product/add-product",
    method: "post",
    data,
  });

export const apiUpdateProduct = (id, data) =>
  axios({
    url: `/api/product/update-product/${id}`,
    method: "put",
    data,
  });

export const apiUploadDescriptionPic = (data) =>
  axios({
    url: "/api/product/upload-description-pic",
    method: "put",
    data,
  });

export const apiDeleteProduct = (id) =>
  axios({
    url: `/api/product/delete-product/${id}`,
    method: "delete",
  });
