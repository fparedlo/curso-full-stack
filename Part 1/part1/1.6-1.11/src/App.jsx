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


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const average = () => (good + (bad * -1)) / (good + neutral + bad);

  const positive = () => (good / (good + neutral + bad)) * 100;
  const total = good + neutral + bad;

  return (
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
  )
}

export default App
