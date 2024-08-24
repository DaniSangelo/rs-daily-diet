import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { setUser } from "../middlewares/setUser";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { describe } from "node:test";
import { format } from "date-fns";

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

    app.put('/:id',
        {
            preHandler: [setUser]
        },
        async (req, res) => {
        const updateMealSchema = z.object({
            name: z.string(),
            description: z.string(),
            mealDate: z.string(),
            isOnDiet: z.boolean()
        })
        const paramsSchema = z.object({ id: z.string().uuid() })
        const { id } = paramsSchema.parse(req.params)
        const mealData = updateMealSchema.parse(req.body)
        const meal = await knex('meal').where({ id }).select('id').first()
        if (!meal) res.status(404).send({ message: 'Meal not found '})
        await knex('meal').update({
            updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            ...mealData,
        })
        res.status(204).send()
    })
}