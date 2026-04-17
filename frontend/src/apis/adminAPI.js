import axios from "../../axios";

export const apiGetAllUsers = (params) =>
  axios({
    url: "/api/user",
    method: "get",
    params,
  });

export const apiGetUserById = (id) =>
  axios({
    url: `/api/user/${id}`,
    method: "get",
  });

export const apiAddUser = (formData) =>
  axios({
    url: "/api/user/add-user",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const apiUpdateUserByAdmin = (id, formData) =>
  axios({
    url: `/api/user/update-user/${id}`,
    method: "put",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const apiDeleteUserByAdmin = (id) =>
  axios({
    url: `/api/user/delete-user/${id}`,
    method: "delete",
  });
