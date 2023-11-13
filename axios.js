import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
  error => {
    return Promise.reject(error);
  }
);
