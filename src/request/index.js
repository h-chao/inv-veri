import axios from 'axios';

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8888', // API基础路径
  timeout: 100000, // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如添加token
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  // if (error.response.status === 401) {
  //   // 处理未授权的逻辑
  //   console.error('未授权，请登录');
  // }
  return Promise.reject(error);
});

export default axiosInstance;
