import axios from "axios";

export const URL =
  process.env.NODE_ENV === "development"
    ? "http://ec2-3-8-48-95.eu-west-2.compute.amazonaws.com:3000"
    : "https://ec2-3-8-48-95.eu-west-2.compute.amazonaws.com:443";

// export const URL = "https://ec2-3-8-48-95.eu-west-2.compute.amazonaws.com:443";

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
