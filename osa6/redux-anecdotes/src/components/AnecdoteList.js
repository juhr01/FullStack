import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filter = state.filter
        const anecdotes = state.anecdotes

        if (!filter) {
            return anecdotes
        }
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const handleVote = anecdote => {
        dispatch(voteAnecdote(anecdote))
        dispatch(showNotification(`You voted ${anecdote.content}`, 3))
    }

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                    <br />
                </div>
            )}
        </div>
    )
}

export default AnecdoteList