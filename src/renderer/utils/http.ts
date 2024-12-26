import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = 'http://localhost:8880/api/v1';
// const baseUrl = "https://19gf08kv-8880.inc1.devtunnels.ms/api/v1";
// const baseUrl = 'http://192.168.1.10:8880/api/v1';
// const baseUrl = 'https://63c4b8pc-8880.inc1.devtunnels.ms/api/v1';

const axiosJson = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosJson.interceptors.request.use(
  function (config) {
    debugger
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosJson.interceptors.response.use(
  function (response) {
    debugger;
    if (response)
      if (response?.data?.message === 'Invalid token.' || response?.data?.message === "Access token is required.") {
        toast("Login please")
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
      }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { axiosJson, baseUrl };
