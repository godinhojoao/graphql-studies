import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('books', table => {
    table.increments('id').primary()
    table.string('author').notNullable()
    table.string('title').notNullable()
    table.boolean('archived').notNullable().defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('books')
}
