import { useState, useEffect, useRef, useReducer } from "react";
import Blogs from './components/Blogs'
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Menu from './components/Menu'
import Users from './components/Users'
import { useMessageDispatch, useAuthDispatch, useAuthState } from "./Context";
import { useQueryClient } from "react-query";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const App = () => {
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

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification />
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
    <Router>
    <div>
      <Menu user={user.username}/>
      <Notification />
      <button id="logout-Button" onClick={handleLogout}>
        logout
      </button>
      <br />
      <br />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        </Routes>
    </div>
    </Router>
  );
};

export default App;
