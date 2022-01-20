import { ApolloError } from 'apollo-server'
import { Book, UpdateBookInput, Db } from './../../../interfaces'

const createBook = async (_: never, { input }: { input: Partial<Book> }, { booksDb }: { booksDb: Db }): Promise<Book> => {
  return await booksDb.createBook(input)
}

const updateBook = async (
  _: never,
  { id, input }: UpdateBookInput,
  { booksDb }: { booksDb: Db }
): Promise<Book | ApolloError> => {
  const bookToUpdate = await booksDb.getBookById(id)

  if (!bookToUpdate) {
    return new ApolloError('book not found', 'not found')
  }

  return await booksDb.updateBook({ id, input })
}

const deleteBook = async (
  _: never, { id }: { id: number },
  { booksDb }: { booksDb: Db }
): Promise<Book | ApolloError> => {
  const bookToDelete = await booksDb.getBookById(id)

  if (!bookToDelete) {
    return new ApolloError('book not found', 'not found')
  }

  return await booksDb.deleteBook(id)
}

export { createBook, updateBook, deleteBook }
