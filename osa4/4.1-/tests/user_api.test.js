const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'testi', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'testi luomus',
        name: 'testi luomus 1',
        password: 'salasana',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })

/* describe('when there is initially one user at db', () => {
    // ...
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  }) */

  describe('when username or password are too short', () => {
    test('creation fails with proper statuscode when username too short', async () => {
      const newUser = {
        username: 'me',
        name: 'matti',
        password: '69'
      }

      await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    })

    test('creation fails with proper statuscode when password too short', async () => {
      const newUser = {
        username: 'meikalainen',
        name: 'matti',
        password: '69'
      }

      await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })