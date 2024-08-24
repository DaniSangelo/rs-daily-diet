import { Knex } from "knex";

declare module 'knex/types/tables' {
    export interface Tables {
        user: {
            id: string,
            name: string,
            surname: string|null,
            email: string,
            birthDate: string|null,
            sessionId: string,
            created_at: string,
            updated_at: string,
        },
    }
}
