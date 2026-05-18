import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "",
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error;
  },
);

export default instance;
