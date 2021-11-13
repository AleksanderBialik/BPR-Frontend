import axios from "axios";

export const URL =
  "https://virtserver.swaggerhub.com/k0k0piotrowski/StockX/1.0.0/";

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

  return request;
});

export default instance;
