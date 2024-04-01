const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const indexRouter = require("./routes/");

const loginRouter = require("./routes/api/login");
const joinRouter = require("./routes/api/join");

const verifyRouter = require("./routes/api/getUserInfo");
const cookieParser = require("cookie-parser");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/join", joinRouter);
app.use("/login", loginRouter);

app.use("/getuser", verifyRouter);
//app.use("")

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // TODO 배포 전 여기 수정 밑에거 주석 없애고 그 아래 코드 지우기
  // res.send("something wrong!");
  res.send(`<h1>Error</h1><p>${err.message}</p><pre>${err.stack}</pre>`);
});

module.exports = app;
