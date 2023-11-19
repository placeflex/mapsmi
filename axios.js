import axios from "axios";

import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

api.interceptors.request.use(config => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token && token.length) {
    config.headers.Authorization = token;
  }

  return config;
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  ({ response }) => {
    toast.error(response.data.error);
    return Promise.reject(error);
  }
);
