import { Book } from './../../../interfaces'
import { Db } from './../../../core/db'

const db = new Db()

const books = async (): Promise<Book[]> => {
  return await db.getBooks()
}

const book = async (_: never, { id }: { id: number }): Promise<Book> => {
  return await db.getBookById(id)
}

export { books, book }
