import fastify from 'fastify'
import 'dotenv/config'

export const server = fastify()

server.listen({
    port:  +process.env.PORT || 3000,
    host: ("RENDER" in process.env) ? '0.0.0.0' : '127.0.0.1'
}, (err, _) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.info(`Server running on port ${process.env.PORT || 3000}`)
})