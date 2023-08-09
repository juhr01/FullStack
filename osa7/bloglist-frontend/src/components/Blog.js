import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, handleLikeChange, handleRemove }) => {
  const { id } = useParams()
  const [removeVisible, setRemoveVisible] = useState(false);

  const blog = blogs.find(b => b.id === id)

  const loggedBloglistUser = JSON.parse(
    localStorage.getItem("loggedBloglistUser"),
  );

  useEffect(() => {
    if (loggedBloglistUser && blog.user.username !== loggedBloglistUser.username) {
      setRemoveVisible(true);
    }
  }, [loggedBloglistUser, blog]);

  const hideWhenNotLogged = { display: removeVisible ? "none" : "" };

  return (
    <div id={blog.title}>
      <div>
        <h2>
          {blog.title} by {blog.author}{" "}
        </h2>
        <p>URL: {blog.url}</p>
        <p>
          Likes: {blog.likes}{" "}
          <button id="like-Button" onClick={() => handleLikeChange(blog)}>
            like
          </button>
          <br />
        </p>
        <p>Added by: {blog.user.username}</p>
        <button
          style={hideWhenNotLogged}
          onClick={() => handleRemove(blog)}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
