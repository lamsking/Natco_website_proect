var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = 5000;
var cors = require('cors');
var app = express();
var bcrypt = require('bcrypt');
var upload = require('express-fileupload')

// Server Configuration
app.use(upload())
app.use(cors());
app.use(session({saveUninitialized: true, resave: false, secret: '123456'}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.set('view engine', 'ejs');


// Disable cache for http Request
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

// Manage Route
var webRoute = require('./routes/web');
var adminRoute = require('./routes/admin');

// Website Routes

app.get('/', webRoute);
app.get('/about', webRoute);
app.get('/works', webRoute);
app.get('/news', webRoute);
app.get('news/:id', webRoute);
app.get('/contact', webRoute);

// Authentification Routes

app.get('/login', webRoute);
app.post('/authentification', webRoute);
app.get('/register', webRoute);
app.post('/signup', webRoute);
app.get('/logout', webRoute);

// Admin Route

app.get('/admin', adminRoute);

// About Manager Routes

app.get('/admin/about', adminRoute);
app.get('/admin/about/create', adminRoute);
app.post('/admin/about/store', adminRoute);
app.get('/admin/about/edit/:id', adminRoute);
app.post('/admin/about/update/:id', adminRoute);
app.get('/admin/about/delete/:id', adminRoute);

// News Manager Routes

app.get('/admin/news', adminRoute);
app.get('/admin/news/create', adminRoute);
app.post('/admin/news/store', adminRoute);
app.get('/admin/news/edit/:id', adminRoute);
app.post('/admin/news/update/:id', adminRoute);
app.get('/admin/news/delete/:id', adminRoute);

// Works Manager Routes

app.get('/admin/works', adminRoute);
app.get('/admin/works/create', adminRoute);
app.post('/admin/works/store', adminRoute);
app.get('/admin/works/edit/:id', adminRoute);
app.post('/admin/works/update/:id', adminRoute);
app.get('/admin/works/delete/:id', adminRoute);


exports.app = app;
exports.port = port;
exports.mongoose = require('mongoose');
