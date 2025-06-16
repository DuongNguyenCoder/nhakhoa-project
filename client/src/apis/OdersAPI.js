import axios from "../../axios";

export const apiAddOrder = (data) =>
  axios({
    url: "/api/order/add-order",
    method: "post",
    data,
  });

export const apiUpdateOrder = (id, data) =>
  axios({
    url: `/api/order/update-order/${id}`,
    method: "put",
    data,
  });
export const apiDeleteOrder = (id) =>
  axios({
    url: `/api/order/delete-order/${id}`,
    method: "delete",
  });
export const apiGetOneOrder = (id) =>
  axios({
    url: `/api/order/${id}`,
    method: "get",
  });
export const apiGetAllOrder = (params) =>
  axios({
    url: "/api/order",
    method: "get",
    params,
  });
