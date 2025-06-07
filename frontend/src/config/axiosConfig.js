import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    // Token varsa Authorization başlığını ekle
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Değiştirilmiş config nesnesini döndürmeyi unutmayın
  },
  (error) => {
    // İstek hatası durumunda yapılacaklar (örn: network hatası)
    return Promise.reject(error);
  }
);

// Response Interceptor'ınız da aşağıdaki gibi olmalı (önceki cevaptan):
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      localStorage.removeItem('authToken');
      alert('Oturum süreniz doldu veya geçersiz. Lütfen tekrar giriş yapın.');
      // İsteğe bağlı: Anasayfaya veya login sayfasına yönlendirme
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);