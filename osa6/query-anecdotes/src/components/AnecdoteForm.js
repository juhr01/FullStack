import { useMutation, useQueryClient } from 'react-query'
import {  createAnecdote } from '../requests'
import { useMessageDispatch } from '../MessageContext'

const AnecdoteForm = () => {
  const dispatch = useMessageDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({type: 'SHORT'})
    } else {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({ content, 'votes': 0 })
      dispatch({type: 'CREATE', name: content})
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
