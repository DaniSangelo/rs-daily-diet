import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { setUser } from "../middlewares/setUser";
import { knex } from "../database";
import { randomUUID } from "crypto";

export async function mealRoutes(app: FastifyInstance) {
    app.post('/', 
        {
            preHandler: [setUser]
        },
        async (req, res) => {
        const createMealSchema = z.object({
            name: z.string(),
            description: z.string(),
            mealDate: z.string(),
            isOnDiet: z.boolean(),
        });
        const meal = createMealSchema.parse(req.body)
        await knex('meal').insert({
            id: randomUUID(),
            userId: req?.userId,
            ...meal
        })
        res.status(201).send()
    })
}