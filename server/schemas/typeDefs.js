const { gql } = require("apollo-server-express");
const { resolvers } = require("./resolvers");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    color: String
    savedTask: [Tasks]!
  }

  type Task {
    task: String
    repeats: Boolean
    repeated_days: String
    active: Boolean!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getSingleUser(user: String!): User
  
    me: User
  }

  input SaveTask {
    authors: [String]
    title: String!
    description: String
    bookId: String
    image: String
    link: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      authors: [String]
      title: String!
      description: String
      bookId: String
      image: String
      link: String
    ): Book
  }
`;

module.exports = typeDefs;
