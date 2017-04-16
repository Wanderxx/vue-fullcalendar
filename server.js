var express = require('express');
var app = express();


app.use(express.static('./'));
var server = app.listen(8070,'127.0.0.1' ,function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
