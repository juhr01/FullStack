const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title === undefined || body.title === null) {
    return response.status(400).end()
  }
  if (body.author === undefined || body.author === null) {
    return response.status(400).end()
  }
  if (body.url === undefined || body.url === null) {
    return response.status(400).end()
  }


  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  try {
    if (await Blog.findById(request.params.id)) {
      const body = request.body
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, blog, { new: true }
      )
      response.json(updatedBlog)
    }
  } catch (exception) {
    next(exception)
  }

  /* Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  .then(updatedBlog => {
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      throw new Error(`Blog with ID ${request.params.id} not found`)
    }
  })
  .catch(error => next(error)) */
})

module.exports = blogsRouter