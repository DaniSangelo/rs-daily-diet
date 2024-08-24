import { Knex, knex as setupKnex } from 'knex'
import 'dotenv/config'

export const config: Knex.Config = {
    client: process.env.DATABASE_CLIENT,
    connection: {
        filename: process.env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    },
}

export const knex = setupKnex(config);