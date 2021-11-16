// require framework and instantiate
const fastify = require('fastify')({ logger: true })

// register plugin
fastify.register(require('./routes/users.js'))

// run
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
