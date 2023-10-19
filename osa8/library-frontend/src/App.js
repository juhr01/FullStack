import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import EditAuthor from './components/EditAuthor'
import Recommended from './components/Recommended'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ALL_BOOKS } from './queries'

const App = () => {
  const result = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`Book ${data.data.bookAdded.title} has been added.`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

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
        {token ? (<button><Link style={style} to="/add">add book</Link></button>) : null}
        {token ? (<button><Link style={style} to="/recommended">recommended</Link></button>) : null}
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
        <Route path="/authors" element={<Authors EditAuthor={ token ? (<EditAuthor />) : null} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        
      </Routes>
    </div>
    </Router>
  )
}

export default App
