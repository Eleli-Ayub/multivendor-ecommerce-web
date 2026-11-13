


import axios from "axios";

export const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

axiosService.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("userToken");
    console.log("interceptor token:", token);

    if (token && token !== "undefined" && token !== "null") {
      req.headers["x-access-token"] = token;
      req.headers.Authorization = `Bearer ${token}`;
    } else {
      // delete req.headers["x-access-token"];
      delete req.headers.Authorization;
      delete req.headers["x-access-token"];
    }

    return req;
  },
  (error) => Promise.reject(error)
);
