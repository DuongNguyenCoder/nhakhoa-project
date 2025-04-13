import axios from "axios";

export const apiGetAllUsers = () =>
  axios({
    url: "/user",
    method: "post",
  });

export const apiGetUserById = (id) =>
  axios({
    url: `/user/${id}`,
    method: "get",
  });

export const apiAddUser = (formData) =>
  axios({
    url: "/user/add-user",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const apiUpdateUserByAdmin = (id, formData) =>
  axios({
    url: `/user/update-user/${id}`,
    method: "put",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const apiDeleteUserByAdmin = (id) =>
  axios({
    url: `/user/delete-user/${id}`,
    method: "delete",
  });
