//Package 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 
var passport = require('./auth/auth')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middleware
app.use(cors({ 
  origin: "http://localhost:3002",
  credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.title = "My App";  
  next();
});

app.use(passport.initialize()) 


//Routes 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carbonDataRouter = require('./routes/carbonDataRoutes'); 
var authRouter = require('./routes/auth')

//endpoints 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/carbon', carbonDataRouter)
app.use('/auth', authRouter)


app.use(function (req, res, next) {
  next(createError(404));
});
 

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001, () => {
  console.log("The app is live")
})

module.exports = app;
