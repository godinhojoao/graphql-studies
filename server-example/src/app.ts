import { ApolloError, ApolloServer } from 'apollo-server'
import { GraphQLFormattedError } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive'

import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { BooksDb } from './core/db'

let schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    constraintDirectiveTypeDefs
  ],
  resolvers
})
schema = constraintDirective()(schema)

const booksDb = new BooksDb()
const server = new ApolloServer({
  schema,
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
