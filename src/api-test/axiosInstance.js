import axios from 'axios';
import {store} from '../store/store'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,  
});

axiosInstance.defaults.headers.common['token'] = `${localStorage.getItem('token')}`;  

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    console.log(token, 'AXIOS TOKEN')
    if (token) {
      config.headers['token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
