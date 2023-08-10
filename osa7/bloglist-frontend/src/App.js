import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Menu from "./components/Menu";
import Users from "./components/Users";
import User from "./components/User";
import { useMessageDispatch, useAuthDispatch, useAuthState } from "./Context";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";

const App = () => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useAuthState();

  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      authDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      authDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      messageDispatch({ type: "LOGIN_ERROR" });
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBloglistUser");
      authDispatch({ type: "LOGOUT" });
    } catch (exception) {
      messageDispatch({ type: "MISC_ERROR", error: exception });
    }
  };

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const blogsResult = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (blogsResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogsResult.data;

  const handleLikeChange = async (event) => {
    const likes = event.likes + 1;
    const likedBlog = { ...event, likes };
    try {
      await updateBlogMutation.mutateAsync(likedBlog);
      messageDispatch({ type: "BLOG_LIKE", title: likedBlog.title });
    } catch (exception) {
      messageDispatch({ type: "MISC_ERROR", error: exception });
    }
  };

  if (user === null) {
    return (
      <Container>
        <div>
          <h2>Log in</h2>
          <Notification />
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                label="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <TextField
                label="password"
                type="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </form>
        </div>
      </Container>
    );
  }

  return (
    <Router>
      <Container>
        <div>
          <Menu user={user.username} handleLogout={handleLogout} />
          {user.username} logged in
          <Notification />
          <br />
          <br />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route
              path="/blogs/:id"
              element={
                <Blog
                  blogs={blogs}
                  handleLikeChange={handleLikeChange}
                  user={user}
                />
              }
            />
          </Routes>
        </div>
      </Container>
    </Router>
  );
};

export default App;
