const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('2 blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
} )

test('identifying field is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toBeDefined
})

describe('blog addition', () => {
  test('status 201 if succeeded', async () => {
    const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Canonical string reduction')
})
})

describe('title empty', () => {
  test('status 400 if empty', async () => {
    const newBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    expect(400)
})
})

describe('url empty', () => {
  test('status 400 if empty', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    expect(400)
})
})

describe('blog deletion', () => {
  test('status 204 if succeeded', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).not.toContain(blogToDelete.title)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})