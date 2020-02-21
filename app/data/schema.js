'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: Int!
    email: String!
  }

  type Holding {
    ticker: String
    name: String
    weight: Float
    sector: String
    created_at: String
  }

  type Query {
    allUsers: [User]
    user(id: Int!): User
    allHoldings: [Holding]
    holding(created_at: String, ticker: String!): Holding
  }

  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
