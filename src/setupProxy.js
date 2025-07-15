const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://e-archive-backend-1.onrender.com',
      changeOrigin: true,
    })
  );
};