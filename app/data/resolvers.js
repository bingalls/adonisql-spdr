'use strict'

const Database = use('Database')
const Holding = use('App/Models/Holding')
const User = use('App/Models/User')

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users. Currently no auth
    async allUsers () {
      const users = await User.all()

      return users.toJSON()
    },

    // Get a user by its ID. Currently no auth
    async user (_, { id }) {
      const user = await User.find(id)

      return user.toJSON()
    },

    // Fetch all stocks
    async allHoldings(_, { unused }, { auth }) {
      try {
        await auth.check()

        const holdings = await Holding.all()
        return holdings.toJSON()
      } catch (error) {
        throw new Error('Requires valid user jwt token')
      }
    },

    // Get a holding by date & symbol
    async holding (_, { created_at, ticker }, { auth }) {
      try {
        await auth.check()

        const holding = await Database
        .raw(
          'select * from holdings where created_at = ? and ticker = ?',
          [created_at, ticker]
        )

        return holding[0] //.toJSON()
      } catch (error) {
        throw new Error('Requires valid user jwt token')
      }
    },

  },

  Mutation: {
    // Handles user login
    async login (_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)

      return token
    },

    // Create new user
    async createUser (_, { username, email, password }) {
      return await User.create({ username, email, password })
    },

  },

}

module.exports = resolvers
