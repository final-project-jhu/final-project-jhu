const sequelize = require("sequelize");
const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');


const {  typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });


const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "sample secret";

const app = express();
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

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
