import axios from "axios";

// Создайте экземпляр Axios с базовым URL для вашего Next.js API
export const api = axios.create({
  baseURL: "http://localhost:3000/api", // Замените на URL вашего Next.js API
});

// Интерсептор для установки заголовка авторизации (если требуется)
api.interceptors.request.use(config => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token && token.length) {
    config.headers.Authorization = token;
  }

  return config;
});

// Интерсептор для обработки ошибок
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // Обработка ошибок здесь
    return Promise.reject(error);
  }
);
