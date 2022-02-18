import { getBooks, getBook } from './queries/Books'
import { createBook, updateBook, deleteBook } from './mutations/Books'

const resolvers = {
  Query: {
    getBooks,
    getBook
  },
  Mutation: {
    createBook,
    updateBook,
    deleteBook
  }
}

export { resolvers }
