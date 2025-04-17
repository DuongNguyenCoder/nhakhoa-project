import axios from "../../axios";

export const apiAddBanner = (data) =>
  axios({
    url: "/api/banner/add-banner",
    method: "post",
    data,
  });
export const apiUpdateBanner = (id, data) =>
  axios({
    url: `/api/banner/update-banner/${id}`,
    method: "put",
    data,
  });
export const apiDeleteBanner = (id) =>
  axios({
    url: `/api/banner/delete-banner/${id}`,
    method: "delete",
  });
export const apiGetBanner = (params) =>
  axios({
    url: "/api/banner",
    method: "get",
    params,
  });
