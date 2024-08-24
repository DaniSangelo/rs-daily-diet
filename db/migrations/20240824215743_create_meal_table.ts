import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meal', (table) => {
        table.uuid('id').notNullable()
        table.uuid('userId').notNullable()
        table.string('name', 255).notNullable()
        table.string('description').notNullable()
        table.dateTime('mealDate').nullable()
        table.tinyint('isOnDiet').notNullable()
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
        table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meal')
}

