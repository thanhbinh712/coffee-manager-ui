import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});
let errorCatch = false;
instance.interceptors.response.use(
  function (config) {
    errorCatch = false;
    return config;
  },
  function (error) {
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        if (!errorCatch) {
          //Swal.warning("Tài khoản hết hiệu lực sử dụng");
          Swal.fire({
            text: "Tài khoản hết hiệu lực sử dụng",
            icon: "warning",
          }).then(() => {
            localStorage.clear();
            window.location.reload(false);
          });
        }
        errorCatch = true;
      }
    }
    return Promise.reject(error);
  },
);

export const getOrder = function (filter) {
  let token = JSON.parse(localStorage.getItem("user")).accessToken;
  const req = instance.get("/api/get_order", {
    params: filter,
    headers: { "x-access-token": token },
  });
  return req;
};

export const createOrder = function (data) {
  let token = JSON.parse(localStorage.getItem("user")).accessToken;
  const req = instance.post("/api/create_order", data, {
    headers: { "x-access-token": token },
  });
  return req;
};

