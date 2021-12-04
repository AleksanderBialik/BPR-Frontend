import axios from "axios";

export const URL = "https://ec2-3-8-48-95.eu-west-2.compute.amazonaws.com:80";

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
