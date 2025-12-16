import axios, { AxiosError } from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:8082/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

baseApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);
