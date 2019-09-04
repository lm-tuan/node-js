require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

const db = require('./db');
const userRoute = require('./routes/user.route');
const userAuth = require('./routes/auth.route');
const logOutAuth = require('./routes/logout.route');
const middlewareLogin = require('./middlewares/middleware.login');

const test = mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cookieParser(process.env.SESSION_SCREET));

app.get("/", (req, res, next) => {
  res.render("index");
});

 app.use("/user",middlewareLogin.middlewareLogin, userRoute);
 app.use('/login',userAuth);
 app.use('/logout',logOutAuth);


app.listen(port, () => {
  console.log("running port", port);
});
