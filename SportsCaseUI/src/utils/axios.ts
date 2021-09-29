import axios from 'axios';
import { API_URL } from 'src/constants';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = API_URL;
axiosInstance.defaults.headers['content-type'] = 'application/json';

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
