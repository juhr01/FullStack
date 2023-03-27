import { useState } from 'react'

const Blog = ({ blog, handleLikeChange, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const loggedBloglistUser = JSON.parse(localStorage.getItem('loggedBloglistUser'))

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

  return (
    <div style={blogStyle} id={blog.title}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={() => handleLikeChange(blog)}>like</button><br />
        {blog.user.username}
        {blog.user.username === loggedBloglistUser.username && (
          <button onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog