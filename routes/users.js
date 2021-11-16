const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/users.controller')

const User = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    age: { type: 'integer' },
  },
}

const getAllUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        user: User,
      },
    },
  },
  handler: getAllUsers,
}

const getUserByIdOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUserById,
}

const createUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'age'],
      properties: {
        id: { type: 'integer' },
      },
    },
    response: {
      201: User,
    },
  },
  handler: createUser,
}

const updateUserByIdOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUserById,
}

const deleteUserByIdOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUserById,
}

async function usersRoutes(fastify, options, done) {
  // all users
  fastify.get('/users', getAllUsersOpts)

  // single user
  fastify.get('/user/:id', getUserByIdOpts)

  // create user
  fastify.post('/user', createUserOpts)

  // update user
  fastify.put('/user/:id', updateUserByIdOpts)

  // delete user
  fastify.delete('/user/:id', deleteUserByIdOpts)

  done()
}
module.exports = usersRoutes
