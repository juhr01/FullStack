import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMessageDispatch } from './MessageContext'

const App = () => {
  const dispatch = useMessageDispatch()

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    /* onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    } */
    onSuccess: (data, variables) => {
      queryClient.setQueryData('anecdotes', old => {
        return old.map(anecdote => {
          if (anecdote.id === variables.id) {
            return { ...anecdote, votes: anecdote.votes + 1 }
          } else {
            return anecdote
          }
        })
      })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, 'votes': anecdote.votes + 1 })
  }

  const result = useQuery('anecdotes', getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>{result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              handleVote(anecdote)
              dispatch({ type: 'VOTE', name: anecdote.content })
            }}>
              vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
