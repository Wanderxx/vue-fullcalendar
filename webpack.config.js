var path    = require('path')
var webpack = require('webpack')

module.exports={
	entry:'./src/main.js',
	output:{
		path:'./static',
		filename:'bundle.js'
	},
  watch : true,
	plugins : [
    new webpack.ProvidePlugin({
      Promise : 'es6-promise'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src' : path.resolve(__dirname, './src')
    }
  },
	module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel'
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
      },
      {
        test   : /\.(png|jpg|gif)$/,
        loader : 'url-loader?limit=8192'
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
    }
}