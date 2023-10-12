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
    color: "black",
    textDecoration: "none"
  }

  return (
    <Router>
    <div>
      <div>
        <button><Link style={style} to="/authors">authors</Link></button>
        <button><Link style={style} to="/books">books</Link></button>
        {token ? (<button><Link style={style} to="/add">add book</Link></button>) : (null)}
        
        {token ? (
          <button><Link style={style} to="/authors" onClick={logout}>
            logout
          </Link></button>
        ) : (
          <button><Link style={style} to="/login">
            login
          </Link></button>
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
