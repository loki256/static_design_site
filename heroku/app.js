var express = require('express');
var path = require('path');
var port = process.env.PORT || 5000;
var app = express();

['public', 'images', 'bower_components', 'scripts', 'styles'].forEach(function(item) {
    console.log(item);
    app.use('/' + item, express.static(__dirname + '/' + item));
});

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/base.html');
}).listen(port);
