const {
  createSession,
  destroySession,
  returnSession,
} = require('../controllers/session.controller')

const response = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    success: { type: 'boolean' },
  },
}

const create = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'password'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: response,
    },
  },
  handler: createSession,
}

const destroy = {
  schema: {
    response: {
      200: response,
    },
  },
  handler: destroySession,
}

const returnUserSession = {
  schema: {
    response: {
      200: response,
    },
  },
  handler: returnSession,
}

async function usersRoutes(fastify, options, done) {
  // create a session
  fastify.post('/session', create)
  // destroy a session
  fastify.post('/destroy', destroy)
  // return user
  fastify.get('/user', returnUserSession)

  done()
}
module.exports = usersRoutes
