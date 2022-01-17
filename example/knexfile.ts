import type { Knex } from 'knex'
import path from 'path'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      connectionString: 'postgres://postgres:test@localhost/graphql_studies',
      timezone: 'utc'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'graphql_studies',
      user: 'test',
      password: 'test',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: function (conn: any, callback: any) {
        conn.query('SET timezone="UTC"; CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', callback)
      }
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/seeds')
    }
  }

}

export default config
