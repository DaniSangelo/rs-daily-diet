import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes'
import fastifyCookie from '@fastify/cookie';
import { mealRoutes } from './routes/mealRoutes';

export const app = fastify()
app.register(fastifyCookie)
app.register(userRoutes, {
    prefix: 'user',
})
app.register(mealRoutes, {
    prefix: 'meal',
})
