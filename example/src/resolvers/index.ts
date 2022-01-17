import { books, book } from './queries/Books'
import { createBook, updateBook, deleteBook } from './mutations/Books'

const resolvers = {
  Query: {
    books,
    book
  },
  Mutation: {
    createBook,
    updateBook,
    deleteBook
  }
}

export { resolvers }
