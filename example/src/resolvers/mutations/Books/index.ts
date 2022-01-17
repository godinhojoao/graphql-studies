import { Book, UpdateBookInput } from './../../../interfaces'
import { Db } from './../../../core/db'

const db = new Db()

const createBook = async (_: never, { input }: { input: Partial<Book> }): Promise<Book> => {
  return await db.createBook(input)
}

const updateBook = async (_: never, { id, input }: UpdateBookInput): Promise<Book> => {
  return await db.updateBook({ id, input })
}

const deleteBook = async (_: never, { id }: { id: number }): Promise<Book> => {
  return await db.deleteBook(id)
}

export { createBook, updateBook, deleteBook }
