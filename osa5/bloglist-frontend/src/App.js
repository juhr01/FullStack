import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBloglistUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage('logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

     try {
      blogService.create(blogObject).await(returnedBlog => 
      setBlogs(blogs.concat(returnedBlog))
      )
      setAuthor('')
      setTitle('')
      setUrl('')
      setErrorMessage(`blog ${title} added by ${author}`)
  } catch (exception) {
    setErrorMessage('blog addition failed')
  }
}

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
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
      <Notification message={errorMessage} />
      <h2>blogs</h2>
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