import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = () => {

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map(b => (
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
