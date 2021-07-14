const WindiCSS = require('windicss-webpack-plugin').default


module.exports = {
  configureWebpack: {
    plugins: [
      new WindiCSS(),
    ],
  },
}
