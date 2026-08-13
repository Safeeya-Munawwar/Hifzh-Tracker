import axios from "axios";
import useAuthStore from "./authStore";

export const API_URL =
  import.meta.env.VITE_APP_NODE_ENV === "production"
    ? import.meta.env.VITE_APP_PRODUCTION_API_URL
    : import.meta.env.VITE_APP_DEVELOPMENT_API_URL;

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state?.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    }
  } catch (e) {
    // ignore JSON parse error
  }
  return config;
});

// ===== REFRESH CONTROL =====
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    const is401 = status === 401;
    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");
    const isLoginEndpoint = originalRequest?.url?.includes("/auth/login");

    if (!is401 || isRefreshEndpoint || isLoginEndpoint) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject: reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await axiosInstance.post("/auth/refresh");
      const refreshData = response.data?.data || response.data;

      useAuthStore
        .getState()
        .setAuth(refreshData.accessToken, refreshData.user);

      processQueue(null, refreshData.accessToken);

      originalRequest.headers.Authorization = `Bearer ${refreshData.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (err) {
      processQueue(err, null);
      useAuthStore.getState().logoutLocal();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
