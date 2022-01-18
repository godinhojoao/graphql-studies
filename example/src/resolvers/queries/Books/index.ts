import { Book, Db } from './../../../interfaces'

const getBooks = async (_: never, __: never, { db }: { db: Db }): Promise<Book[]> => {
  return await db.getBooks()
}

const getBook = async (_: never, { id }: { id: number }, { db }: { db: Db }): Promise<Book> => {
  return await db.getBookById(id)
}

export { getBooks, getBook }
