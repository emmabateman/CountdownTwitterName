var express = require('express')
var path = require('path');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', routes);
app.use('/users', users);

module.exports = app;
