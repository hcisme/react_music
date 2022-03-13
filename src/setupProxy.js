const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://81.68.248.232:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  )
}
