import { gql, useQuery } from '@apollo/client'

const Books = (props) => {

  const ALL_BOOKS = gql`
    query {
    allBooks {
        title
        author
    published
    id
    }
  }
`

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)

  if (!props.show) {
    return null
  }

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
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
