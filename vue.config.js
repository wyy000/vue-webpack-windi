const WindiCSS = require('windicss-webpack-plugin').default

module.exports = {
  configureWebpack: {
    plugins: [
      new WindiCSS(),
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          ws: true,
          changeOrigin: true,
        },
      }
    }
  },
}
