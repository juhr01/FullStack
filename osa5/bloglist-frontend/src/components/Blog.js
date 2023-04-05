import { useState } from 'react'

const Blog = ({ blog, handleLikeChange, handleRemove }) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideDetailsWhenVisible = { display: visible ? 'none' : '' }
  const showDetailsWhenVisible = { display: visible ? '' : 'none' }

  const hideWhenNotLogged = { display: removeVisible ? 'none' : '' }

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
    if (loggedBloglistUser && blog.user.username !== loggedBloglistUser.username) {
      setRemoveVisible(true)
    }
  }

  return (
    <div style={blogStyle} id={blog.title}>
      <div style={hideDetailsWhenVisible} className='blogTitle'>
        <p id='blogTitleHidden'>{blog.title} {blog.author} <button onClick={toggleVisibility} id='viewDetails-Button'>view</button></p>
      </div>
      <div style={showDetailsWhenVisible} className='blogDetails'>
        <p id='blogTitleVisible'>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p id='blogUrl'>{blog.url}</p>
        <p id='blogLikes'>likes {blog.likes} <button id='like-Button' onClick={() => handleLikeChange(blog)}>like</button><br /></p>
        <p id='blogUserUsername'>{blog.user.username}</p>
        <button style={hideWhenNotLogged} onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog