var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ControllerRegister, checkExist } = require("./Controller/register.controller");
const { login, loginAdmin } = require("./Controller/login.controller");
var indexRouter = require('./routes/index');
const categoryRouter = require("./routes/category.router");
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/users.router");
const orderRouter = require("./routes/order.router");
const reviewRouter = require("./routes/review.router");
const shipperRouter = require("./routes/shipper.router");
const houseRouter = require("./routes/storehouse.router");
const bannerRouter = require("./routes/banner.router");
var app = express();
var cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Api
app.use('/', indexRouter);
app.post("/api/register", checkExist, ControllerRegister);
app.post("/api/login", login);
app.post("/api/loginAdmin", loginAdmin);
app.use("/api/Category", categoryRouter);
app.use("/api/Product", productRouter);
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use('/api/review', reviewRouter);
app.use('/api/shipper', shipperRouter);
app.use('/api/house', houseRouter);
app.use('/api/banner', bannerRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;