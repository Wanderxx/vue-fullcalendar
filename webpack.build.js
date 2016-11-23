var WebpackStripLoader = require('strip-loader')
var devConfig = require('./webpack.config.js')
var webpack = require('webpack')
var version = process.env.VERSION || require('./package.json').version

var banner =
  'vue-fullcalendar v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Sunny Wang <sunnywang0104@163.com> \n' +
  '@license MIT'

var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
}
devConfig.module.loaders.push(stripLoader);
devConfig.entry = './src/index.js'
devConfig.output = {
  path:'./dist',
  filename:'vue-fullcalendar.js',
  library:'VueFullcalendar',
  libraryTarget: 'umd'
}
devConfig.plugins = devConfig.plugins.concat([
  new webpack.BannerPlugin(banner)
])
module.exports = devConfig;