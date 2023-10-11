import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const Authors = (props) => {
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

const result = useQuery(ALL_AUTHORS, {
  pollInterval: 2000
})

  if (result.loading)  {
    return <div>loading...</div>
  }
  console.log(result)

  if (!props.show) {
    return null
  }

  console.log(result.data.allAuthors)

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit birth year...')

    editAuthor({ variables: { name, born }})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set author birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value=''>select author</option>
            {result.data.allAuthors.map(a => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
          type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
