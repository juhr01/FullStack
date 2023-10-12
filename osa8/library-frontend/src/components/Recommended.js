import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE, ALL_BOOKS } from '../queries'

const Recommended = () => {
    const books = useQuery(ALL_BOOKS)
    const favorite = useQuery(FAVORITE_GENRE)
    if (books.loading) {
        return <div>loading...</div>
    }


    const favoriteGenre = favorite.data.me.favoriteGenre

    console.log(favoriteGenre)

    const filteredBooks = books.data.allBooks.filter((book) => book.genres.includes(favoriteGenre));

    return (
        <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre: {favoriteGenre}</p>
        <table>
    <tbody>
      <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
      </tr>
      {filteredBooks.map(b => (
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

export default Recommended