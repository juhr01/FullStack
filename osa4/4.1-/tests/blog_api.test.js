const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('2 blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toEqual(2)
} )



afterAll(async () => {
  await mongoose.connection.close()
})