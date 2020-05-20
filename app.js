var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const prodiRouter = require('./routes/prodi'); 
const mahasiswaRouter = require('./routes/mahasiswa'); 
const ruangRouter = require('./routes/ruang');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/prodi', prodiRouter(express));
app.use('/mahasiswa', mahasiswaRouter(express));
app.use('/ruang', ruangRouter(express));

module.exports = app;
