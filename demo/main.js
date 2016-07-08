// main entry file
// var Vue = require('vue')
import Vue from 'vue'

new Vue({
  el : '#app',
  components : {
    'app' : require('./app')
  }
})


