// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://server-vtv7.onrender.com/api', // Base URL for all requests
});

export default axiosInstance;
