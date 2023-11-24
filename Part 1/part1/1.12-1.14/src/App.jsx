import { useState } from 'react'

//1.6 to 1.11
const Statistics = ({ data }) => {
  const { good, neutral, bad, average, positive, total } = data
  return (
    <section>
      <header>
        <h1>
          Stadistics
        </h1>
      </header>
        <table>
          <tbody>
          <tr>
            <td>
              <StatisticLine text='good' value={good} />

            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='neutral' value={neutral} />

            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='bad' value={bad} />

            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='all' value={total} />
            </td>
          </tr>
          <tr>
            <td>

              <StatisticLine text='average' value={average() ? average() : 0} />
            </td>
          </tr>
          <tr>
            <td>

              <StatisticLine text='positive' value={`${positive() ? positive() : 0}%`} />
            </td>
          </tr>
          </tbody>
        </table>
    </section >
  )
}
const StatisticLine = ({ text, value }) => <li>{text}: {value}</li>
const Button = ({ clickHandle, text }) => <button onClick={clickHandle}>{text}</button>

//1.12
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [anecdoteIndex, setAnecdoteIndex] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes[anecdoteIndex])

  const average = () => (good + (bad * -1)) / (good + neutral + bad);

  const positive = () => (good / (good + neutral + bad)) * 100;
  const total = good + neutral + bad;


  const handleNextAnecdote = () => { 
    let randomAnedote = anecdotes[getRandomInt(anecdotes.length)]

    while (randomAnedote === anecdote) {
      randomAnedote = anecdotes[getRandomInt(anecdotes.length)]
    }
    return setAnecdote(randomAnedote)
  }

  function getRandomInt(max) {
    const randomNum = Math.floor(Math.random() * max)
    console.log(randomNum)
    setAnecdoteIndex(randomNum)
  }

  function handleVote() {

  }

  return (
    <>
      <section>
        <header>
          <h1>
            1.6 to 1.11 - Give Feedback
          </h1>
        </header>
        <main>
          <Button clickHandle={() => setGood(good + 1)} text="Good" />
          <Button clickHandle={() => setNeutral(neutral + 1)} text="Neutral" />
          <Button clickHandle={() => setBad(bad + 1)} text="Bad" />
          {total > 0 ? <Statistics data={{ good, neutral, bad, average, positive, total }} /> : <p>No feedback given</p>}
        </main>
      </section>
      <hr />
      <section>
        <header>
          <h1>1.12</h1>
        </header>
        <main>
          <p>{anecdote}</p>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleNextAnecdote}>next anecdote</button>
        </main>
      </section>
    </>
  )
}

export default App
