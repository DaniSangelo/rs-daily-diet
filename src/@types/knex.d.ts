import { Knex } from "knex";
import { number } from "zod";

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

        meal: {
            id: string,
            userId: string,
            name: string,
            description: string,
            mealDate: string,
            isOnDiet: boolean,
            created_at: string,
            updated_at: string,
        }
    }
}
