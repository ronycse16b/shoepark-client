// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Set your base URL here
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken'); // Adjust according to where you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
