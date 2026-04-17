import instance from "../../axios";

export const apiSignIn = (data) =>
  instance({
    url: "/api/user/sign-in",
    method: "post",
    data,
  });
export const apiSignUp = (data) =>
  instance({
    url: "/api/user/sign-up",
    method: "post",
    data,
  });
export const apiLogOut = () =>
  instance({
    url: "/api/user/log-out",
    method: "post",
  });
export const apiGetCurrent = () =>
  instance({
    url: "/api/user/current",
    method: "get",
  });
export const apiUpdateProfile = (formData) =>
  instance({
    url: "/api/user/update-profile",
    method: "put",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const apiForgotPassword = (data) =>
  instance({
    url: "/api/user/forgot-password",
    method: "post",
    data,
  });
export const apiCheckForgotPassCode = (data) =>
  instance({
    url: "/api/user/check-code",
    method: "post",
    data,
  });
export const apiResetPassword = (data) =>
  instance({
    url: "/api/user/reset-password",
    method: "post",
    data,
  });
export const apiAddToCard = (data) =>
  instance({
    url: "/api/user/add-to-cart",
    method: "put",
    data,
  });
export const apiRemoveFromCard = (data) =>
  instance({
    url: "/api/user/remove-from-cart",
    method: "put",
    data,
  });
export const apiClearCard = () =>
  instance({
    url: "/api/user/clear-cart",
    method: "put",
  });
