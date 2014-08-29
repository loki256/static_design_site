var express = require('express');
var path = require('path');
var port = process.env.PORT || 5000;
var app = express();

['public', 'images', 'bower_components', 'scripts', 'styles', 'fonts'].forEach(function(item) {
    console.log(item);
    app.use('/' + item, express.static(path.join(__dirname, item), {maxAge: 2592000000}));
});

app.get('/', function(request, response) {
    response.sendfile(path.join(__dirname, 'public', 'base.html'));
}).listen(port);
