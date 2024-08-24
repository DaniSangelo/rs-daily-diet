import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

export async function setUser (request: FastifyRequest, response: FastifyReply) {
    const sessionId = request.cookies.sessionId;
    if (!sessionId) response.status(401).send({ message: 'Unauthorized'})
    const user = await knex('user').where({ sessionId: sessionId }).select('id').first()
    if (!user) response.status(400).send({ message: "User does not exist"})
    request.userId = user.id;
}