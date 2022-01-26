import { Client } from 'pg'
const connectionString = 'postgres://postgres:test@localhost/postgres'

async function run (): Promise<void> {
  const client = new Client(connectionString)
  try {
    await client.connect()
    // await client.query(/* sql */ `
    //   SELECT pg_terminate_backend(pg_stat_activity.pid)
    //   FROM pg_stat_activity
    //   WHERE pg_stat_activity.datname in ('graphql_studies') AND pid <> pg_backend_pid();
    // `)

    await client.query('DROP DATABASE IF EXISTS graphql_studies;')
    await client.query('CREATE DATABASE graphql_studies;')
    console.log('[✓] created database graphql_studies')
  } finally {
    client && await client.end()
  }
}

run()
