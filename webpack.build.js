var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');
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
module.exports = devConfig;