import React, { useState, useEffect } from 'react';
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([])

  const { loading, data } = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  });

  useEffect(() => {
    if (!loading && data) {
      // Extract and set the available genres
      const genres = [...new Set(data.allBooks.map((book) => book.genres).flat())];
      setGenres(genres);
    }
  }, [loading, data]);


  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <h3>filter by genre</h3>
      <select onChange={e => setSelectedGenre(e.target.value)}>
        <option value="">all genres</option>
        {genres.map(g => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks
          .filter((book) => !selectedGenre || book.genres.includes(selectedGenre))
          .map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
