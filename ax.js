import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3888",
});

// Request: tambahkan token
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: tangani token expired
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response);

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (error.response.data === "TokenExpiredError") {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
