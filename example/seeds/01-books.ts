import { Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    {
      id: 1,
      author: 'João dale',
      title: 'Livro muito brabo',
      archived: false
    },
    {
      id: 2,
      author: 'Joãozao',
      title: 'Livro arquivado',
      archived: true
    },
    {
      id: 3,
      author: 'Cleber da silva',
      title: 'Drácula',
      archived: false
    }
  ])
}
