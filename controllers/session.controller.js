const bcrypt = require('bcrypt')
// const saltRounds = 10

let data = require('../data.js')

const createSession = async (req, reply) => {
  const { name, password } = req.body

  const user = data.find((user) => user.name == name)

  if (!user) {
    reply.send({ message: 'User not found' })
  } else {
    const isValid = await bcrypt.compare(password, user.password)

    if (isValid) {
      req.session.authenticated = true      
      reply.send({ message: 'Authenticated', success: true })
    } else {
      reply.send({ message: 'Invalid password', success: false })
    }
  }
}

const destroySession = async (req, reply) => {
  req.destroySession((err) => {
    if (err) {
      reply.send({ message: 'Error destroying session', success: false })
    } else {
      reply.send({ message: 'Session destroyed', success: true })
    }
  })
}

const returnSession = async (req, reply) => {
  if (req.session.authenticated) {
    reply.send({ message: 'Session found', success: true })
  } else {
    reply.send({ message: 'Not authenticated', success: false })
  }
}

module.exports = {
  createSession,
  destroySession,
  returnSession,
}
