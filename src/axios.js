import axios from "axios";
import store from "./store";

export const URL =
  process.env.NODE_ENV === "development"
    ? "http://stockx-lb-1734521826.eu-west-2.elb.amazonaws.com:3000"
    : "https://stockx-lb-1734521826.eu-west-2.elb.amazonaws.com";

const instance = axios.create({
  baseURL: URL,
});

const getToken = () => {
  return localStorage.getItem("token");
};

instance.interceptors.request.use((request) => {
  if (getToken()) {
    request.headers["x-auth-token"] = `${getToken()}`;
  }
  request.headers["Content-Type"] = "application/json";

  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      store.dispatch("authentication/logout");
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default instance;
