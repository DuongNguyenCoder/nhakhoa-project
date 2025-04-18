import axios from "../../axios";

export const apiAddOrder = (data) =>
  axios({
    url: "/api/order/add-order",
    method: "post",
    data,
  });
