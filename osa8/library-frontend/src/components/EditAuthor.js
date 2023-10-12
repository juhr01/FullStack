import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const EditAuthor = () => {
    const [editAuthor] = useMutation(EDIT_AUTHOR)
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const result = useQuery(ALL_AUTHORS, {
        pollInterval: 2000
    })

    if (result.loading) {
        return <div>loading...</div>
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log('edit birth year...')

        editAuthor({ variables: { name, born } })
        setName('')
        setBorn('')
    }

    return (
        <div>
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

export default EditAuthor