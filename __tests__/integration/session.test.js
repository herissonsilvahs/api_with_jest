const request = require('supertest')
const app = require('../../src/main')
// const { User } = require('../../src/models')

describe('Register', () => {
  it('Should not register user because missing parans', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      email: 'herissonsilvahs@gmail.com',
      password: '12345678'
    })
    expect(response.status).toBe(400)
  })

  it('Should register user successfully', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      name: 'Herisson Silva',
      email: 'herissonsilvahs@gmail.com',
      password: '12345678'
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('user')
  })
})

describe('Authentication', () => {  
  it('Should not authenticated with invalid email', async () => {
    const response = await request(app)
    .post('/signin')
    .send({
      email: 'herisson@gmail.com',
      password: '12345678'
    })
    expect(response.status).toBe(400)
  })

  it('Should not authenticated with invalid password', async () => {
    const response = await request(app)
    .post('/signin')
    .send({
      email: 'herissonsilvahs@gmail.com',
      password: '12345688'
    })
    expect(response.status).toBe(400)
  })

  it('Should authenticated with valid credentials', async () => {
    const response = await request(app)
    .post('/signin')
    .send({
      email: 'herissonsilvahs@gmail.com',
      password: '12345678'
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('user')
  })
})
