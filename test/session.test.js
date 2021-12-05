const build = require('../fastify')

const user = { name: 'Farhan', password: '12345' }

test('should create session & return true with 200', async () => {
  const app = build()
  const session = await app.inject({
    url: 'http://localhost:3000/api/v1/session',
    method: 'POST',
    payload: user,
  })

  expect(session.statusCode).toBe(200)
  expect(session.json().message).toBe('Authenticated')
  expect(session.json().success).toBeTruthy()
})

test('should create session & return session', async () => {
  const app = build()
  const create = await app.inject({
    url: 'http://localhost:3000/api/v1/session',
    method: 'POST',
    payload: user,
  })

  const cookie = create.headers['set-cookie']

  expect(create.statusCode).toBe(200)
  expect(create.json().message).toBe('Authenticated')
  expect(create.json().success).toBeTruthy()

  const session = await app.inject({
    url: 'http://localhost:3000/api/v1/user',
    method: 'GET',
    headers: { cookie },
  })

  expect(session.statusCode).toBe(200)
  expect(session.json().message).toBe('Session found')
  expect(session.json().success).toBeTruthy()
})

test('should destroy session', async () => {
  const app = build()
  const session = await app.inject({
    url: 'http://localhost:3000/api/v1/destroy',
    method: 'POST',
  })

  expect(session.statusCode).toBe(200)
  expect(session.json().message).toBe('Session destroyed')
  expect(session.json().success).toBeTruthy()
})
