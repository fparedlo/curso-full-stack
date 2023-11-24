import { useState } from 'react'

const Statistics = ({ data }) => {
  const { good, neutral, bad, average, positive } = data
  return (
    <section>
      <header>
        <h1>
          Stadistics
        </h1>
        <ul>
          <li>good: {good}</li>
          <li>neutral: {neutral}</li>
          <li>bad: {bad}</li>
          <li>average: {average() ? average() : 0}</li>
          <li>positive: {positive() ? positive() : 0}%</li>
        </ul>
      </header>
    </section>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const average = () => (good + (bad * -1)) / (good + neutral + bad) ;

  const positive = () => (good / (good + neutral + bad)) * 100;
  const total = good + neutral + bad;


  return (
    <>
      <section>
        <header>
          <h1>
            Give Feedback
          </h1>
          <button onClick={() => setGood(good + 1)}>Good</button>
          <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
          <button onClick={() => setBad(bad + 1)}>Bad</button>
        </header>
      </section>
      {total > 0 ? <Statistics data={{good, neutral, bad, average, positive}} /> : <p>No feedback given</p>}
    </>
  )
}

export default App
