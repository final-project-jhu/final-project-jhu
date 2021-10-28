const { gql } = require("apollo-server-express");
const { resolvers } = require("./resolvers");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    color: String
    savedTask: [Task]!
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

  type Mutation {
    addUser(name: String!, email: String!, password: String!, color: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    saveTask(
      title: String!
      description: String
      link: String
    ): Task
  }
`;

module.exports = typeDefs;
