import { Book, Db } from './../../../interfaces'

const getBooks = async (
  _: unknown,
  __: unknown,
  { booksDb }: { booksDb: Db }
): Promise<Book[]> => {
  return await booksDb.getBooks()
}

const getBook = async (
  _: unknown,
  { id }: { id: number },
  { booksDb }: { booksDb: Db }
): Promise<Book> => {
  return await booksDb.getBookById(id)
}

export { getBooks, getBook }
