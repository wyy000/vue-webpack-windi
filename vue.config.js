console.log(99999999)
const WindiCSS = require('windicss-webpack-plugin')

console.log(123, 'WindiCSS')

module.exports = {
  configureWebpack: {
    plugins: [
      new WindiCSS,
    ],
  },
}
