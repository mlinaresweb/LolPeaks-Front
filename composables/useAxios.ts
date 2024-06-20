import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:3001';
const adminURL = `${baseURL}/admin`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

const axiosAdminInstance: AxiosInstance = axios.create({
  baseURL: adminURL,
});

axiosAdminInstance.interceptors.request.use(config => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAxios = (): { axiosInstance: AxiosInstance; axiosAdminInstance: AxiosInstance } => {
  return { axiosInstance, axiosAdminInstance };
};
