import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3605",
  withCredentials: true,
});
