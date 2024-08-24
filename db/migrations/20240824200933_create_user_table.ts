import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (table) => {
        table.uuid('id').primary()
        table.string('name', 30).notNullable()
        table.string('surname', 60).nullable()
        table.string('email', 100).notNullable().unique()
        table.date('birthDate').nullable()
        table.uuid('sessionId').notNullable().unique()
        table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable()
        table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user')
}

