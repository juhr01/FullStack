import { createAnecdote } from '../reducers/anecdoteReducer'
import {  useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm