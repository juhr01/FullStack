import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import EditAuthor from './components/EditAuthor'
import { useApolloClient } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const style = {
    padding: "5px",
    marginBottom: "10px",
    marginRight: "10px",
    color: "black",
    border: "1px solid black",
    textDecoration: "none"
  }

  return (
    <Router>
    <div>
      <div>
        <Link style={style} to="/authors">authors</Link>
        <Link style={style} to="/books">books</Link>
        {token ? (<Link style={style} to="/add">add book</Link>) : (null)}
        
        {token ? (
          <Link style={style} to="/authors" onClick={logout}>
            logout
          </Link>
        ) : (
          <Link style={style} to="/login">
            login
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/authors" element={<Authors EditAuthor={ token ? (<EditAuthor />) :( null)} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        {token ? (
          null
        ) :(
          <Route path="/login" element={<LoginForm setToken={setToken}/>} />
        )}
      </Routes>
    </div>
    </Router>
  )
}

export default App
