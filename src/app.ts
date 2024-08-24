import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes'
import fastifyCookie from '@fastify/cookie';

export const app = fastify()
app.register(fastifyCookie)
app.register(userRoutes, {
    prefix: 'user',
})
