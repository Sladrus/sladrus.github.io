import axios from 'axios';

const $api = axios.create({
  baseUrl: process.env.REACT_APP_API_URl,
  port: process.env.REACT_APP_API_PORT,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URl}api/user/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('token', response.data.accessToken);
        return await $api.request(originalRequest);
      } catch (e) {
        console.log(e.response);
      }
    }
    throw error;
  }
);

export default $api;
