var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./app/middleware/db");
global.AppDir = 'core';
global.Fs = require('fs-extra');
global.Path = require('path');
global.Mongoose = require("mongoose");

require('./app/utils/global');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./app/load-controllers')(app);
db.connect();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


module.exports = app;
