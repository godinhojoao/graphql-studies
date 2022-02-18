import { Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    {
      author: 'João dale',
      title: 'Livro muito brabo',
      archived: false
    },
    {
      author: 'Joãozao',
      title: 'Livro arquivado',
      archived: true
    },
    {
      author: 'Cleber da silva',
      title: 'Drácula',
      archived: false
    }
  ])
}
