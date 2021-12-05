const fastify = require('fastify')

const cookie = require('fastify-cookie')
const session = require('@fastify/session')

function init(opts = {}) {
  const app = fastify(opts)

  // register plugin
  app.register(require('./routes/session.js'), { prefix: '/api/v1' })

  app.register(cookie)
  app.register(session, {
    secret: 'e685890cdd306385f671246011f82f24',
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // change to true for production
    },
  })

  app.get('/', (req, res) => {
    res.send({ message: 'This is an API run with Fastify.' })
  })

  return app
}

module.exports = init
