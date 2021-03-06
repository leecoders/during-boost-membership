const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./configs/cors.js");

const usersRouter = require("./routes/users");

const app = express();
const data = require("./model/data.js");

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/set-room-number", (req, res, next) => {
  const { roomNumber } = req.body;
  res.cookie("roomNumber", roomNumber);
  res.json({ message: "success" });
});
app.use("/initial-data", (req, res, next) => {
  const { roomNumber } = req.body;
  res.json({ data: data });
});
app.use("/users", usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
