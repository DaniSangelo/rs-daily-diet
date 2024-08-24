import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { knex } from '../database'

export async function userRoutes(app: FastifyInstance) {
    app.post('/', async (req, res) => {
        const createUserSchema = z.object({
            name: z.string(),
            surname: z.string().nullable(),
            email: z.string().email(),
            birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).date().nullable(),
        });
        const {
            name,
            surname,
            email,
            birthDate,
        } = createUserSchema.parse(req.body)
        const emailInUse = await knex('user').where({ email }).select('id').first();
        if (emailInUse) res.status(400).send({ message: 'User already exist'})
        let sessionId = req.cookies.sessionId
        if (!sessionId) {
            sessionId = randomUUID()
            res.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24, // 1 dia
            });
        }
        await knex('user').insert({
            id: randomUUID(),
            name,
            surname,
            email,
            birthDate,
            sessionId,
        });
        return res.status(201).send()
    })
}