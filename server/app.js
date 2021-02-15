const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const jwt = require("./helper/jwt");

const usersRouter = require("./routes/users");
const storyRouter = require("./routes/story");
const app = express();
app.use(logger("dev"));
// use JWT auth to secure the api
app.use(jwt());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/story", storyRouter);

module.exports = app;
