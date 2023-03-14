import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage('error wrong cridentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    } catch (exception) {
      setMessage('error logout failed')
    }
    
  }

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      'title': title,
      'author': author,
      'url': url
    }

    console.log(blogObject)

    if (blogObject.title === null || blogObject.title === "") {
      setMessage('error title empty')
    } else if (blogObject.author === null || blogObject.author === "") {
      setMessage('error author empty')
    } else if (blogObject.author === null || blogObject.url === "") {
      setMessage('error url empty')
    } else {
      try {
        let returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setMessage(`blog ${title} added by ${author}`)
    } catch (exception) {
      setMessage('error blog addition failed')
    }
    }
}

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form></div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <br/>
      <br/>
      <form onSubmit={addBlog}>
        <h2>add new blog</h2>
        <div>title: <input value={title} onChange={({target}) => setTitle(target.value)}/></div>
        <div>author: <input value={author} onChange={({target}) => setAuthor(target.value)}/></div>
        <div>url: <input value={url} onChange={({target}) => setUrl(target.value)}/></div>
        <button type='submit'>create</button>
      </form>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App