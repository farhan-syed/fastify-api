let data = require('../data.js')

const getAllUsers = (req, reply) => {
  reply.send(data)
}

const getUserById = (req, reply) => {
  const { id } = req.params

  // find user by id
  const user = data.find((user) => user.id == id)

  reply.send(user)
}

const createUser = (req, reply) => {
  const { name, age } = req.body

  const user = {
    id: data.length + 1,
    name,
    age,
  }

  data = [...data, user]

  reply.code(201).send(user)
}

const updateUserById = (req, reply) => {
  const { id } = req.params
  const { name, age } = req.body

  const user = data.find((user) => user.id == id)

  user.name = name
  user.age = age

  reply.send(user)
}

const deleteUserById = (req, reply) => {
  const { id } = req.params

  data = data.filter((user) => user.id != id)

  reply.send({ message: `User of the id:${id} has been removed` })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
