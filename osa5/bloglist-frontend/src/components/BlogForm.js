import { useState } from 'react'

const BlogForm = ({ createBlog }, props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      user: props.user,
      title: title,
      author: author,
      url: url
    })
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  return (
    <div>
      <h2>create a new blog</h2>
      <form name="blog" onSubmit={addBlog}>
        <div>title: <input type="text" name="title" id="title" onChange={handleTitleChange}/> </div>
        <div>author: <input type="text" name="author" id="author" onChange={handleAuthorChange}/> </div>
        <div>url: <input type="text" name="url" id="url" onChange={handleUrlChange}/> </div>
        <button type="submit" id="create-Button">create</button>
      </form>
    </div>
  )
}

export default BlogForm