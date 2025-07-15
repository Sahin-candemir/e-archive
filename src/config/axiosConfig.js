import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
  (error) => {

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      localStorage.removeItem('authToken');
      alert('Oturum süreniz doldu veya geçersiz. Lütfen tekrar giriş yapın.');
    }
    return Promise.reject(error);
  }
);