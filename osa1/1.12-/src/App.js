import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0);


  let newSelected = 0;

  const changeAnecdote = () => {

    newSelected = Math.floor(Math.random() * anecdotes.length)

    if (newSelected == selected) {
      changeAnecdote()
    } else {
      setSelected(newSelected)
    }

  }

  const vote = () => {
    const copy = [...votes]

    copy[selected] += 1

    setVotes(copy)

    if (copy[selected] >= copy[mostVoted]) {
      setMostVoted(selected);
    }
    console.log(votes)
    console.log('votes of selected anecdote ' + votes[selected])
    console.log(anecdotes[mostVoted])
    console.log('mostVoted ' + mostVoted)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={vote} text={'vote'} />
      <Button handleClick={changeAnecdote} text={'next anecdote'} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      <br />
      has {votes[mostVoted]} votes

    </div>

  )
}

export default App