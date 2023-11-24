import { useState } from 'react'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = () => {
 
  const [anecdoteIndex, setAnecdoteIndex] = useState(0)
  const anecdote = () => anecdotes[anecdoteIndex]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  

  const handleNextAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    while (anecdotes[randomIndex] === anecdote()) {
      randomIndex = Math.floor(Math.random() * anecdotes.length)
    }
    setAnecdoteIndex(randomIndex)
  }

  const handleVote = (anecdoteIndex) => {
    const copy = [...votes]
    copy[anecdoteIndex] += 1
    setVotes(copy)
  }

  const topVotedAnecdote = () => {
    const max = Math.max(...votes) > 0 ? Math.max(...votes) : null
    return anecdotes[votes.indexOf(max)] || 'No anecdotes have been voted yet'
  }

  return (
      <section>
        <header>
          <h1>1.12</h1>
        </header>
        <main>
          <p>{anecdote()}</p>
          <p>has {votes[anecdoteIndex]} votes</p>
          <button onClick={() => handleVote(anecdoteIndex)}>vote</button>
          <button onClick={handleNextAnecdote}>next anecdote</button>
          <hr />
          <h2>Anecdote with most votes</h2>
          <p>{topVotedAnecdote()}</p>
        </main>
      </section>
  )
}

export default App
