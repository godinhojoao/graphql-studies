import { Book, UpdateBookInput, Db } from './../../../interfaces'

const createBook = async (_: never, { input }: { input: Partial<Book> }, { db }: { db: Db }): Promise<Book> => {
  return await db.createBook(input)
}

const updateBook = async (_: never, { id, input }: UpdateBookInput, { db }: { db: Db }): Promise<Book> => {
  return await db.updateBook({ id, input })
}

const deleteBook = async (_: never, { id }: { id: number }, { db }: { db: Db }): Promise<Book> => {
  return await db.deleteBook(id)
}

export { createBook, updateBook, deleteBook }
