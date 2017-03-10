var path    = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
	entry:'./demo/main.js',
	output:{
		path:path.resolve(__dirname, 'static'),
    publichPath : '/static/',
		filename:'bundle.js'
	},
	plugins : [
    new webpack.ProvidePlugin({
      Promise : 'es6-promise'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src' : path.resolve(__dirname, './src'),
      'dist' : path.resolve(__dirname, './dist')
    }
  },
	module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel?presets[]=es2015'
      },
      {
        test:/\.vue$/,
        loader:'vue'
      },{
        test:/\.scss$/,
        loader:'style!css!sass'
      },
      {
        test:/\.css$/,
        loader:'style!css'
      }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['> 1%']
    },
    loaders: {
      scss: 'style!css!sass'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devServer: {
    port : 8070,
    historyApiFallback: true,
    stats : {
      colors : true,
      chunks : false
    }
  }
};