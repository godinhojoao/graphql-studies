import { Book, Db } from './../../../interfaces'

const getBooks = async (_: never, __: never, { booksDb }: { booksDb: Db }): Promise<Book[]> => {
  return await booksDb.getBooks()
}

const getBook = async (_: never, { id }: { id: number }, { booksDb }: { booksDb: Db }): Promise<Book> => {
  return await booksDb.getBookById(id)
}

export { getBooks, getBook }
