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

    app.delete('/:id', { preHandler: [setUser]}, async (req, res) => {
        const deleteMealSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = deleteMealSchema.parse(req.params)
        const meal = await knex('meal').where({ id }).select('id').first()
        if (!meal) res.status(404).send({ message: 'Meal not found' })
        await knex('meal').delete(id)
        res.status(204).send()
    })

    app.get('/', { preHandler: [setUser]}, async (req, res) => {
        const meals = await knex
            .from('meal')
            .select();
        return res.status(200).send({ meals })
    })

    app.get('/:id',
        {
            preHandler: [setUser]
        },
        async (req, res) => {
        const paramsSchema = z.object({ id: z.string().uuid() })
        const { id } = paramsSchema.parse(req.params)
        const meal = await knex('meal').where({ id }).select().first()
        res.status(200).send({meal})
    })

    app.get('/statistics', { preHandler: [setUser]}, async (req, res) => {
        const meals = await knex('meal').where({ userId: req?.userId}).select()
        const totalOnDiet = meals.reduce((acc, curr) => Boolean(curr.isOnDiet) == true ? ++acc : acc, 0)
        return res.status(200).send({
            total: meals.length,
            totalOnDiet: totalOnDiet,
            totalOutDiet: meals.length - totalOnDiet
        })
    })
}