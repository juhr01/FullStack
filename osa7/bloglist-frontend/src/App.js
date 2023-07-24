import { useState, useEffect, useRef, useReducer } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useMessageDispatch } from './Context'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const messageDispatch = useMessageDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

/*   const queryClient = useQueryClient()

  const result = useQuery('blogs', blogService.getAll)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      messageDispatch({ type: 'LOGIN_ERROR' });
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBloglistUser");
      setUser(null);
    } catch (exception) {
      messageDispatch({ type: 'MISC_ERROR', error: exception});
    }
  };

  const addBlog = async (blogObject) => {
    try {
      let returnedBlog = await blogService.create(blogObject, user.token);
      setBlogs(blogs.concat(returnedBlog));
      blogFormRef.current.toggleVisibility();
      messageDispatch({ type: 'BLOG_CREATE', title: blogObject.title, author: blogObject.author });
    } catch (exception) {
      console.log(exception);
      messageDispatch({ type: 'MISC_ERROR', error: exception});
    }
  };

  const handleLikeChange = async (event) => {
    const likes = event.likes + 1;
    const likedBlog = { ...event, likes };
    const updatedBlogs = blogs.map((blog) =>
      blog.id === event.id ? likedBlog : blog,
    );

    await blogService.update(event.id, likedBlog);
    setBlogs(updatedBlogs);
    messageDispatch({ type: 'BLOG_LIKE', title: likedBlog.title})
  };

  const handleRemove = async (event) => {
    if (window.confirm(`Remove blog ${event.title} by ${event.author}?`)) {
      try {
        await blogService.remove(event.id, user.token);
        setBlogs(blogs.filter((blog) => blog.id !== event.id));
        messageDispatch({ type: 'BLOG_REMOVE', title: event.title});
      } catch (exception) {
        messageDispatch({ type: 'MISC_ERROR', error: exception});
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id="usernameInput"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="passwordInput"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-Button">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{user.username} logged in</p>
      <button id="logout-Button" onClick={handleLogout}>
        logout
      </button>
      <br />
      <br />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeChange={handleLikeChange}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  );
};

export default App;
