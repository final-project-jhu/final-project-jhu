const sequelize = require("sequelize");
const express = require("express");
const session = require("express-session");
const path = require("path");

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || "sample secret";

const app = express();
const routes = require("./routes");
const db = require("./models");
const passport = require("./config/passport.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use(routes);

db.sequelize.sync().then(function() { 
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
 });

});