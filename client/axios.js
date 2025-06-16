import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
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
