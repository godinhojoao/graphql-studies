import { ApolloError, ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

import { BooksDb } from './core/db'
import { GraphQLFormattedError } from 'graphql'

const booksDb = new BooksDb()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({ booksDb }),
  formatError: (err): GraphQLFormattedError => {
    if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
      return new ApolloError('We are having some trouble', 'ERROR')
    }

    return err
  }
})

server.listen(4000)
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })

export { server }
