import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

import { Db } from './core/db'

const db = new Db()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({ db })
})

server.listen(4000)
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })

export { server }
