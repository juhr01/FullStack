import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const likedBlog = {...blog, likes}
    await blogService.update(blog.id, likedBlog)
  }

  return (
    <div style={blogStyle} id={blog.title}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.username}
      </div>
    </div>
  )
}

export default Blog