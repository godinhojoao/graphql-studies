import { Book, UpdateBookInput } from '../interfaces'
import knexfile from '../../knexfile'
import Knex from 'knex'

const knex = Knex(knexfile.development)

class Db {
  async getBooks (): Promise<Book[]> {
    const books = await knex('books').where({ archived: false })
    return books
  }

  async getBookById (id: number): Promise<Book> {
    const [book] = await knex('books').where({ id: id })
    return book
  }

  async createBook (book: Partial<Book>): Promise<Book> {
    const [createdBook]: any = await knex<Partial<Book>>('books')
      .insert(book)
      .returning('*')
    return createdBook
  }

  async updateBook ({ id, input }: UpdateBookInput): Promise<Book> {
    const [updatedBook]: any = await knex<Partial<Book>>('books')
      .update(input)
      .where({ id })
      .returning('*')
    return updatedBook
  }

  async deleteBook (id: number): Promise<Book> {
    const [deletedBook]: any = await knex('books')
      .update({ archived: true })
      .where({ id })
      .returning('*')
    return deletedBook
  }
}

export { Db }
