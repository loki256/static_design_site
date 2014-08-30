var express = require('express');
var path = require('path');
var port = process.env.PORT || 5000;
var app = express();

['public', 'images', 'bower_components', 'scripts', 'styles', 'fonts'].forEach(function(item) {
    console.log(item);
    app.use('/' + item, express.static(path.join(__dirname, item), {maxAge: 2592000000}));
});

app.get('/', function(request, response) {
    response.sendfile(path.join(__dirname, 'public', 'gallery.html'));
})

app.get('/:page', function(request, response) {
    response.sendfile(path.join(__dirname, 'public', request.params.page));
})

app.get('/project:projectId/:page', function(request, response) {
    response.sendfile(path.join(__dirname, 'public', 'project' + request.params.projectId, request.params.page));
})

app.listen(port);
