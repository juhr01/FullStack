const BlogForm = ({ createBlog }, props) => {
  const addBlog = event => {
    event.preventDefault()
    createBlog({
      user: props.user,
      title: document.forms['blog']['title'].value,
      author: document.forms['blog']['author'].value,
      url: document.forms['blog']['url'].value
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[name="blog"]')
    form.addEventListener('submit', addBlog)
  })

  return (
    <div>
      <h2>create a new blog</h2>
      <form name="blog" onSubmit={addBlog}>
        <div>title: <input type="text" name="title" id="title"/> </div>
        <div>author: <input type="text" name="author" id="author"/> </div>
        <div>url: <input type="text" name="url" id="url"/> </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm