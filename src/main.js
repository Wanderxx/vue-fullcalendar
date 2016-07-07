// main entry file
var Vue = require('vue')

new Vue({
  el : '#app',
  components : {
    'app' : require('./app')
  }
})


