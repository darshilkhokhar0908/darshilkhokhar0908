var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const db = require("./app/middleware/db");
global.Config = require('./app/config/default.json');
global.AppDir = 'admin';
global.Fs = require('fs-extra');
global.Path = require('path');
global.Mongoose = require("mongoose");

require('./app/utils/global');

var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./app/load-controllers')(app);
db.connect();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({message: err.message});
});

module.exports = app;
