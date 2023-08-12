import axios from "axios";

const baseURL = "/api/v1";
const timeout = 5000;

const http = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("accessToken");
    // In a real application the refresh token works automatically through the cookies,
    // For this assignment I've decided to manage the refresh token in localStorage as the access token.
    const refresh_token = localStorage.getItem("refreshToken");

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    if (refresh_token) {
      config.headers["x-refresh-token"] = `Bearer ${refresh_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await http.get("/auth/refresh");
    const accessToken = response.data;
    return accessToken;
  } catch (error) {
    console.error(error.message);
  }
};

http.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response.status === 401) {
      if (localStorage.getItem("accessToken")) {
        const token = await refreshAccessToken();
        localStorage.setItem("accessToken", token.access_token);
        return http(err.config);
      }

      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(new Error("Session is over"));
    }

    if (err.response.status === 409) {
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject(new Error("Session is over"));
    }
  }
);

export default http;
